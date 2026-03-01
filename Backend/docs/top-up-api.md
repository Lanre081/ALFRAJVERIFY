# Backend API Documentation: Wallet Top-Up

This document explains the current wallet top-up flow exactly as implemented in the backend, so a frontend developer can integrate it safely.

---

## 1) Feature Summary

The top-up flow is a **Paystack-initialized card/bank payment** flow:

1. Frontend sends a top-up request with amount.
2. Backend creates a `transactions` record with status `Processing`.
3. Backend calls Paystack initialize API and returns an `authorization_url` + `reference`.
4. Frontend redirects user to Paystack checkout using `authorization_url`.
5. Paystack sends webhook events to backend.
6. Backend webhook marks transaction `Successful` or `Failed`.
7. On success, backend increments the user's balance by the transaction amount.

---

## 2) Base URL and Route Group

All top-up endpoints are mounted under:

- `POST /transactions/top-up`
- `POST /transactions/status`

> Both routes are protected by auth middleware, so they require `Authorization: Bearer <accessToken>`.

---

## 3) Authentication Requirement

`/transactions/*` uses JWT auth middleware.

Required header:

```http
Authorization: Bearer <accessToken>
```

If missing or invalid:

- `401 { success: false, message: "No token provided" }`
- `401 { success: false, message: "Invalid or expired token" }`

The access token payload is expected to contain at least:

- `id`
- `email`

The top-up controller reads both from `req.user`.

---

## 4) Endpoint: Initialize Top-Up

## `POST /transactions/top-up`

Creates a `Processing` transaction in DB and initializes a Paystack transaction.

### Request Body

```json
{
  "amount": 100
}
```

### Validation Rules

- `amount` must be:
  - number
  - positive
  - minimum `100`
  - required
- unknown fields are stripped
- strict mode is enabled

### Success Response

**HTTP 200**

```json
{
  "authorization_url": "https://checkout.paystack.com/...",
  "success": true,
  "reference": "uuid-v4-reference"
}
```

### Error Response

**HTTP 500**

```json
{
  "success": false,
  "message": "Unable to initialize payment at this time. Please try again later."
}
```

### Frontend Integration Notes

- Amount is treated as major currency unit in your request, then multiplied by `100` on backend before sending to Paystack (kobo conversion).
- Save returned `reference` in frontend state/local storage during flow. You can use it for status checks.
- Open/redirect user to `authorization_url` immediately after successful init.

---

## 5) Endpoint: Verify Transaction Status

## `POST /transactions/status`

Fetches current transaction status from Paystack using `reference`.

### Request Body

```json
{
  "reference": "uuid-v4-reference"
}
```

### Success Response

**HTTP 200**

```json
{
  "success": true,
  "transactionStatus": {
    "status": true,
    "message": "Verification successful",
    "data": {
      "status": "success",
      "reference": "uuid-v4-reference"
    }
  }
}
```

> `transactionStatus` is the raw axios response from Paystack verify call. Consume `transactionStatus.data` carefully in frontend.

### Error Response

**HTTP 500**

```json
{
  "success": false,
  "message": "Unable to fetch payment details. Please try again later."
}
```

### Frontend Integration Notes

- This route currently has no celebrate schema validation for `reference`; frontend should always send a valid non-empty string.
- Prefer using this for user feedback after redirect/callback while waiting for webhook finalization.

---

## 6) Webhook Finalization (Important for Balance Updates)

Frontend does **not** call this directly, but must understand it because balance updates depend on it.

Backend webhook endpoint:

- `POST /webhook/paystack`

Behavior:

- `charge.success`
  - Marks transaction status from `Processing` -> `Successful`
  - Increments user balance by transaction amount
  - Idempotent: repeated success events for an already processed reference are safely ignored
- `charge.failure`
  - Marks transaction status from `Processing` -> `Failed`

So, even if frontend sees successful checkout, **wallet balance is only guaranteed updated after webhook success processing**.

---

## 7) Transaction States You Should Expect

The transaction model allows these statuses:

- `Processing`
- `Failed`
- `Successful`

For top-up flow UX:

- Show `Processing` immediately after init/redirect return.
- Move to success UI only when verification/webhook-backed status confirms success.
- Handle `Failed` with retry CTA.

---

## 8) Suggested Frontend Flow (Implementation-Safe)

1. User enters amount.
2. Frontend calls `POST /transactions/top-up` with bearer token.
3. On `200`, store `reference`, redirect to `authorization_url`.
4. After Paystack redirect back to your app:
   - call `POST /transactions/status` with same `reference`
   - display pending/success/failure states
5. Refresh/reload user profile/balance after success state.
6. If needed, poll status briefly (with backoff) because webhook processing may complete slightly after user returns.

---

## 9) Clarifications Needed (to avoid wrong assumptions)

Please confirm these decisions so frontend and backend stay aligned:

1. **Currency display**: backend does `amount * 100` for Paystack. Should frontend display and submit amount strictly in NGN major unit (e.g., `100` = ₦100)?
2. **Status response shape**: Do you want backend to return only `transactionStatus.data` instead of full axios response object for cleaner frontend consumption?
3. **Post-payment callback contract**: Is there an official frontend callback route/query format already (e.g., `/wallet/top-up/callback?reference=...`)?
4. **Source of truth for success UI**: Should frontend rely only on `/transactions/status`, or do you want a dedicated backend endpoint reading your own `transactions` DB status?
5. **Failed/cancelled checkout behavior**: Should frontend treat abandoned checkout as `Failed`, or keep as `Processing` until timeout logic?

