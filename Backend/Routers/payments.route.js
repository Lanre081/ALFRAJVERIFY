const express = require("express");
const { topUp } = require("../Controllers/payments.controller");
const router = express.Router();

router.post("/initialize", topUp);

module.exports = router;
