const paystackApiClient = require("../Apis/paystack.api");
const crypto = require("crypto");
const transactionsCollection = require("../DB/Models/transactions.models");
const { v4: uuidv4 } = require("uuid");

const initialize_User_Balance_Top_Up = async (req, res) => {
  const amount = req.body.amount * 100;
  const type = "TOP-UP"; // DO NOT CHANGE THE VALUE OF THIS VAR OR THERE WILL BE SERIOUS CONSEQUENCES!
  const { email } = req.user;

  const reference = uuidv4(); // Acts as an id for the transaction.

  const userId = req.user.id;

  try {
    await transactionsCollection.create({
      reference,
      userId,
      type,
      status: "Processing",
      amount,
    });

    const response = await paystackApiClient.post("/transaction/initialize", {
      amount,
      email,
      reference,
    });

    const authorization_url = response.data.authorization_url;

    res.status(200).json({ authorization_url, success: true, reference });
  } catch (error) {
    console.error("Payment init error:", error);
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

    res.status(200).json({ transactionStatus });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch payment details. Please try again later.",
    });
  }
};

const webhook_Handler = async (req, res) => {
  try {
    const signature = req.headers["x-paystack-signature"];
    const PAYSTACK_SECRET = process.env.PAYSTACK_API_KEY;

    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET)
      .update(req.body)
      .digest("hex");

    if (hash !== signature) {
      return res.sendStatus(401); 
    }

    const response = JSON.parse(req.body.toString());

    if (response.event === "charge.success") {
      const reference = response.data.reference;
      try {
        const updated = await transactionsCollection.findOneAndUpdate(
          { reference },
          { status: "Successful" },
          { new: true },
        );
        res.sendStatus(200);
      } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};

module.exports = {
  initialize_User_Balance_Top_Up,
  verify_Transaction_Status,
  webhook_Handler,
};
