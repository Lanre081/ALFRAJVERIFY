const express = require("express");
const { topUpUserBalance } = require("../Controllers/payments.controller");
const router = express.Router();

router.post("/initialize", topUpUserBalance);

module.exports = router;
