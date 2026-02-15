const express = require("express");
const { topUpUserBalance } = require("../Controllers/payments.controller");
const router = express.Router();

router.post("/top-up", topUpUserBalance);

module.exports = router;
