//  Main
const express = require("express");
const app = express();

//  Helpers
const cors = require("cors");
const connectDB = require("./DB/Connections/connectDB");
const { errors } = require("celebrate");

//  Routers
const authRouter = require("./Routers/auth.route");
const userRouter = require("./Routers/users.route");
const transactionRouter = require("./Routers/payments.route");

// Middlewares
const { authLimiter } = require("./Middleware/rate-limiter.middleware");
const authMiddleware = require("./Middleware/auth.middleware");
const { webhook_Handler } = require("./Controllers/payments.controller");

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Webhooks
app.post(
  "/webhook/paystack",
  express.raw({ type: "application/json" }),
  webhook_Handler
);

app.use(express.json());

app.use("/transactions", authMiddleware, transactionRouter);
app.use("/auth", authLimiter, authRouter);
app.use("/users", userRouter);

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server says Heyyyy! :)" });
});

app.use(errors());

module.exports = app;
