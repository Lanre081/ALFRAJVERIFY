const paystackApiClient = require("../Apis/paystack.api");
const crypto = require("crypto");
const transactionsCollection = require("../DB/Models/transactions.model");
const usersCollection = require("../DB/Models/users.model");
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

    // Success case

    if (response.event === "charge.success") {
      const reference = response.data.reference;
      try {
        // Update transaction in db
        const updated_Transacation =
          await transactionsCollection.findOneAndUpdate(
            { reference, status: "Processing" },
            { status: "Successful" },
            { new: true },
          );

        console.log(updated_Transacation);

        if (!updated_Transacation) {
          return res.sendStatus(200); // already processed or invalid reference
        }

        const updated_Amount = updated_Transacation.amount / 100;

        // Updates user balance in db
        const updated_User_Balance = await usersCollection.findByIdAndUpdate(
          updated_Transacation.userId,
          { $inc: { balance: updated_Amount } },
          { new: true },
        );

        console.log(updated_User_Balance);

        return res.sendStatus(200);
      } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ success: false, message: "An error occured" });
      }
    }

    // Mark as failed incase of failure
    else if (response.event === "charge.failure") {
      const reference = response.data.reference;
      try {
        await transactionsCollection.findOneAndUpdate(
          { reference, status: "Processing" },
          { status: "Failed" },
          { new: true },
        );
        return res.sendStatus(200);
      } catch (error) {
        console.error(error);
        res.status(500);
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
