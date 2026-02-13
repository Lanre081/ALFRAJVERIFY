const paysatckApiClient = require("../Apis/paystack.api");

const topUp = async (req, res) => {
  const amount = "5000"; /*req.body*/

  const email = "test@email.com"; /*user.email*/
  // I'll add the normal stuff once the test is complete

  // const {amount}  = req.body;
  //const email = user.email
  try {
    const response = await paysatckApiClient.post("/transaction/initialize", {
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
