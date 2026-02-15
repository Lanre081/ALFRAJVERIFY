const express = require("express");
const { initialize_User_Balance_Top_Up } = require("../Controllers/payments.controller");
const router = express.Router();

router.post("/top-up", initialize_User_Balance_Top_Up);

module.exports = router;
