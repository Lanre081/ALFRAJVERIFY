const paystackApiClient = require("../Apis/paystack.api");
const crypto = require("crypto");

const topUpUserBalance = async (req, res) => {
  const amount = /* req.body.amount * 100 */ 5000 * 100;
  // I'm not sure if amount is a string or number though.

  const email = "test@email.com"; /*user.email*/
  // I'll add the normal stuff once the test is complete

  const reference = crypto.randomUUID(); // Acts as an id for the transaction.
  // const {amount}  = req.body;
  //const email = user.email

  const Amt_To_Be_Paid = amount * 100;

  // Note the above for dev sanity

  try {
    const response = await paystackApiClient.post("/transaction/initialize", {
      amount,
      email,
      reference,
    });
 
    const authorization_url = response.data.data.authorization_url

    res.status(200).json({ authorization_url, success: true });

    // I think I shd send only auth url and store access code and refrence in db or smth

    // After payment is confirmed, we update user bal.... I have no idea how buh we'll get there :)
  } catch (error) {
    console.error(error);
    res.send(error?.data);
  }
};

module.exports = { topUpUserBalance };
