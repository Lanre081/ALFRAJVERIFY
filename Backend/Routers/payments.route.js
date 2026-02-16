const express = require("express");
const { initialize_User_Balance_Top_Up, verify_Transaction_Status } = require("../Controllers/payments.controller");
const router = express.Router();

router.post("/top-up", initialize_User_Balance_Top_Up);
router.post("/verify", verify_Transaction_Status);

module.exports = router;
