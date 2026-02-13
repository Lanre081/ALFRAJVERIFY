const paystackApiClient = require("../Apis/paystack.api");

const topUp = async (req, res) => {
  const amount = "5000"; /*req.body*/
  // I'm not sure if amount is a string or number though.

  const email = "test@email.com"; /*user.email*/
  // I'll add the normal stuff once the test is complete

  // const {amount}  = req.body;
  //const email = user.email

  const Amt_To_Be_Paid = amount * 100;

  // Note the above for dev sanity

  try {
    const response = await paystackApiClient.post("/transaction/initialize", {
      amount,
      email,
    });
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.send(error.data);
  }
};

module.exports = { topUp };
