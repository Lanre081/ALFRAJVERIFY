const paystackApiClient = require("../Apis/paystack.api");
const crypto = require("crypto");
const transactionsCollection = require("../DB/Models/transactions.model");
const usersCollection = require("../DB/Models/users.model");
const { v4: uuidv4 } = require("uuid");
const {
  handleChargeFailure,
  handleChargeSuccess,
} = require("../Services/paystack.service");

const initialize_User_Balance_Top_Up = async (req, res) => {
  const amount = req.body.amount;
  const type = "TOP-UP"; // DO NOT CHANGE THE VALUE OF THIS VAR OR THERE WILL BE SERIOUS CONSEQUENCES!
  const { email } = req.user;

  const reference = uuidv4(); // Acts as an id for the transaction.

  const userId = req.user.id;

  try {
    // Create transaction doc in db
    await transactionsCollection.create({
      reference,
      userId,
      type,
      status: "Processing",
      amount,
    });

    // initialize paystack transaction
    const response = await paystackApiClient.post("/transaction/initialize", {
      amount: amount * 100, // Because paystack expects kobo
      email,
      reference,
    });

    const { authorization_url } = response.data;

    res.status(200).json({ authorization_url, success: true, reference });
  } catch (error) {
    console.error("Payment init error:", error.message);
    res.status(500).json({
      success: false,
      message:
        "Unable to initialize payment at this time. Please try again later.",
    });
  }
};

const verify_Transaction_Status = async (req, res) => {
  try {
    const { reference } = req.body;

    const transactionStatus = await paystackApiClient.get(
      `/transaction/verify/${reference}`,
    );

    res.status(200).json({ success: true, transactionStatus });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch payment details. Please try again later.",
    });
  }
};

const webhook_Handler = async (req, res) => {
  const reference = response.data.reference;

  // Success event

  if (response.event === "charge.success") {
    try {
      const result = await handleChargeSuccess(reference);
      if (result.alreadyProcessed || result.processed) {
        return res.sendStatus(200); // Idempotent response for already processed transactions
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      res.status(500).json({ success: false, message: "An error occured" });
    }
  }

  // Failure event
  else if (response.event === "charge.failure") {
    try {
      await handleChargeFailure(reference);

      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
};

module.exports = {
  initialize_User_Balance_Top_Up,
  verify_Transaction_Status,
  webhook_Handler,
};
