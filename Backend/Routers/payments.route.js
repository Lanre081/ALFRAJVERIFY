const express = require("express");
const { initialize_User_Balance_Top_Up, verify_Transaction_Status } = require("../Controllers/payments.controller");
const { celebrate } = require("celebrate");
const { top_up_schema } = require("../Schemas/transactions.schema");
const router = express.Router();

router.post("/top-up", celebrate({body: top_up_schema}), initialize_User_Balance_Top_Up);
router.post("/status", verify_Transaction_Status);

module.exports = router;
