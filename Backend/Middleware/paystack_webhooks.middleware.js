const crypto = require("crypto");

const verifyPaystackWebhook = (req, res, next) => {
  const signature = req.headers["x-paystack-signature"];

  if (!signature) {
    return res.sendStatus(400); // bad request
  }

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_API_KEY)
    .update(req.body)
    .digest("hex");

  if (hash !== signature) {
    return res.sendStatus(401); // unauthorized
  }

  // Signature is valid
  next();
};

module.exports = verifyPaystackWebhook;
