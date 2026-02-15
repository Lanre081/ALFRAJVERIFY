const paystackApiClient = require("../Apis/paystack.api");
const crypto = require("crypto");
const transactionsCollection = require("../DB/Models/transactions.models");

const initialize_User_Balance_Top_Up = async (req, res) => {
  const amount = /* req.body.amount * 100 */ 5000 * 100;
  const type = "TOP-UP";

  const email = "test@email.com"; /*user.email*/

  const reference = crypto.randomUUID(); // Acts as an id for the transaction.
  // const {amount}  = req.body;
  //const email = user.email
  // const userId = req.user.id

  try {
    const transactionRecord = await transactionsCollection.create({
      reference,
      userId,
      type,
      status: "Processing",
    });

    const response = await paystackApiClient.post("/transaction/initialize", {
      amount,
      email,
      reference,
    });

    const authorization_url = response.data.data.authorization_url;

    res.status(200).json({ authorization_url, success: true });

    // I think I shd send only auth url and store access code and refrence in db or smth

    // After payment is confirmed, we update user bal.... I have no idea how buh we'll get there :)
  } catch (error) {
    console.error("Payment init error:", error); // log for debugging
    res.status(500).json({
      success: false,
      message:
        "Unable to initialize payment at this time. Please try again later.",
    });
  }
};

module.exports = { initialize_User_Balance_Top_Up };
