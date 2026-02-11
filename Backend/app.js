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


connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json()); // Parse first

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.get("/health", (req, res) => {
  res.send("Server says Heyyyy! :)");
});

app.use(errors());

module.exports = app;
