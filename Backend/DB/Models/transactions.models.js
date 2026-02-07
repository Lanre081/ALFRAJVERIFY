const mongoose = require("mongoose");

const TRANSACTION_STATUSES = ["Pending", "Processing", "Failed", "Successful"];
const TRANSACTION_TYPES = ["TOP-UP", "AIRTIME", "DATA"];

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      default: "Pending",
      enum: TRANSACTION_STATUSES,
      required: true,
    },
    type: {
      enum: TRANSACTION_TYPES,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

const Transaction = mongoose.model(
  "Transaction",
  transactionSchema,
  "transactions",
);

module.exports = Transaction;
