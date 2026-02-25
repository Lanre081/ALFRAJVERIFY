const express = require("express");
const { getAllUsers, getUserData } = require("../Controllers/users.controller");
const authMiddleware = require("../Middleware/auth.middleware");
const router = express.Router()

router.get("/data", authMiddleware ,getUserData)

module.exports = router