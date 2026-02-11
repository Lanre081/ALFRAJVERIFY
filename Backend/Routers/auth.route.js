const { celebrate } = require("celebrate");
const express = require("express");
const { registerSchema, loginSchema } = require("../Schemas/users.schema");
const {
  registerUser,
  loginUser,
} = require("../Controllers/auth.controller");
const router = express.Router();

router.post("/register", celebrate({ body: registerSchema }), registerUser);
router.post("/login", celebrate({ body: loginSchema }), loginUser);

module.exports = router;
