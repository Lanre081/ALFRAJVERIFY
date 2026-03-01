# Top-Up Integration Implementation Guide (Architecture-Safe)

> Purpose: This guide is for implementing/iterating on **Top-Up** in the existing frontend without breaking current architecture.
> 
> Audience: frontend devs and coding agents working in this repo.

---

## 1) Non-Negotiable Architecture Rules (Current Project)

These are the existing patterns in this codebase and should be preserved:

1. **API layer is split by domain** under `Frontend/src/Apis`.
   - `api.client.js` is the shared axios instance.
   - domain files (`api.auth.js`, `api.user.js`) export plain methods.
2. **Hooks wrap API methods** and expose a standard shape:
   - `{ data, loading, error, ...methods }`
   - methods call a shared `execute` wrapper.
3. **Components call hooks, not axios directly**.
4. **Auth token injection is centralized** in axios request interceptor.
5. **API responses are normalized to `res.data`** by axios response interceptor.

If you add Top-Up, keep this exact flow: **Component -> Hook -> Domain API file -> shared API client**.

---

## 2) Existing Frontend Data Flow (Important)

### 2.1 Shared API client

`Frontend/src/Apis/api.client.js`:

- Reads base URL from `VITE_API_URL`.
- Adds `Authorization: Bearer <token>` from localStorage when present.
- Returns `res.data` (not full axios response).

**Implication for Top-Up:** any API method added in this app should return backend JSON directly, e.g.:

```js
// returns { success, authorization_url, reference }
const result = await api.post("/transactions/top-up", payload);
```

No `.data.data` access at API layer unless backend itself nests it.

### 2.2 Hook contract

`useAuth` and `useUserData` reset `data` before each call and then set either `data` or `error`.

**Implication for Top-Up:** top-up hook should follow same contract and naming style so UI behavior stays consistent.

### 2.3 Component consumption pattern

Components currently:

- call hook method in submit/click handlers,
- render loading/error from hook,
- react to success inside `useEffect` based on `data?.success`.

**Implication for Top-Up:** do not bypass this by embedding API logic directly in UI components.

---

## 3) Backend Contract for Top-Up (As implemented)

Protected routes under `/transactions`:

- `POST /transactions/top-up`
- `POST /transactions/status`

### 3.1 Initialize

Request:

```json
{ "amount": 100 }
```

Response (`200`):

```json
{
  "authorization_url": "https://checkout.paystack.com/...",
  "success": true,
  "reference": "uuid"
}
```

### 3.2 Verify status

Request:

```json
{ "reference": "uuid" }
```

Response (`200`):

```json
{
  "success": true,
  "transactionStatus": { ... }
}
```

`transactionStatus` mirrors Paystack verify response from backend controller.

---

## 4) Recommended File Additions (Minimal, Consistent)

To respect the existing structure, implement Top-Up in these layers.

### 4.1 API domain file

Create: `Frontend/src/Apis/api.transactions.js`

Expected shape:

```js
import api from "./api.client";

const transactionApi = {
  topUp: (payload) => api.post("/transactions/top-up", payload),
  getStatus: (payload) => api.post("/transactions/status", payload),
};

export default transactionApi;
```

### 4.2 Hook file

Create: `Frontend/src/Hooks/useTransactions.js`

Use the same pattern as existing hooks:

- local `data`, `loading`, `error`
- shared `execute`
- methods:
  - `topUp(payload)`
  - `getTopUpStatus(reference)` -> wraps `{ reference }`

### 4.3 Component integration

Do one of these without breaking current component hierarchy:

1. Add Top-Up modal/section inside `DashboardPage.jsx` and wire actions through `useTransactions`, **or**
2. Add a dedicated Top-Up page and route, but still call `useTransactions`.

Do not call axios directly from `DashboardPage`.

---

## 5) Component-Level Integration Flow (Safe Sequence)

1. Collect amount from user input.
2. Client-validate amount (`number`, `>= 100`).
3. Call `topUp({ amount })` from `useTransactions`.
4. On success:
   - persist returned `reference` (state or session/local storage),
   - redirect browser to `authorization_url`.
5. After user returns to app, call `getTopUpStatus(reference)`.
6. Show `processing/success/failed` UI states.
7. On success, refetch profile via existing `useUserData().getProfile()` to refresh wallet balance card.

---

## 6) Error Handling Rules (Match Existing UX)

Use same backend error extraction style already used in auth components:

```js
error?.response?.data?.message ||
error?.response?.data?.validation?.body?.message ||
error?.message ||
""
```

Top-up screens should use this same pattern for consistency.

---

## 7) State & Side-Effect Rules

1. **Do not decode JWT in transaction hook** (already handled globally for auth context/user display).
2. **Do not mutate tokens in top-up flow**.
3. **Do not assume webhook completed instantly** after checkout return.
4. If status remains pending, allow a short retry/poll with user feedback.

---

## 8) API Shape Cautions (to prevent silent bugs)

Because `api.client` returns `res.data`, expected hook `data` values are backend JSON directly.

Examples:

- `topUp` success check:
  - `data?.success`
  - `data?.authorization_url`
  - `data?.reference`
- `profile` currently accessed as `data?.data` in dashboard because backend `GET /user/profile` appears to return nested `data`.

For top-up implementation, avoid assuming nested response unless endpoint explicitly returns it.

---

## 9) Agent-Safe Implementation Checklist

Before shipping any top-up frontend change, confirm:

- [ ] Added/updated only through API layer + hook layer + consuming component.
- [ ] No direct axios call in component.
- [ ] All transaction calls use `/transactions/*` via shared api client.
- [ ] Loading/error states surfaced from hook.
- [ ] Success path redirects using backend `authorization_url`.
- [ ] Return/callback path verifies using saved `reference`.
- [ ] Balance refresh uses existing `useUserData().getProfile()`.
- [ ] Existing login/signup/dashboard behavior is unchanged.

---

## 10) Clarifications To Lock Before Final UI Decisions

To avoid wrong assumptions, align these decisions with backend owner first:

1. What exact frontend callback route should Paystack return to?
2. Should frontend poll `/transactions/status` and for how long?
3. What is the canonical success condition in `transactionStatus` payload (`success`, `data.status`, both)?
4. Should cancelled/abandoned payment show `Failed` or `Pending` with retry?
5. Is there any planned backend endpoint for transaction history that should replace dashboard mock data?

---

## 11) Quick Mapping of Current Files (Reference)

- API client: `Frontend/src/Apis/api.client.js`
- Existing domain APIs: `Frontend/src/Apis/api.auth.js`, `Frontend/src/Apis/api.user.js`
- Existing hooks: `Frontend/src/Hooks/useAuth.js`, `Frontend/src/Hooks/useUserData.js`
- Current consumer components: `Frontend/src/components/Auth/LoginPages.jsx`, `Frontend/src/components/Auth/SignupPage.jsx`, `Frontend/src/components/Main/DashboardPage.jsx`
- Token helpers: `Frontend/src/Helpers/Auth/tokens.js`

Use this mapping when extending the app so code remains predictable for future contributors and agents.
