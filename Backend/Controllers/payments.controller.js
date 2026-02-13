const paysatckApiClient = require("../Apis/paystack.api");

const topUp = async (req, res) => {
  const { amount } = req.body;
  const email = user.email;
  try {
    const res = await paysatckApiClient.post("/transaction/initialize", {
      amount,
      email,
    });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

topUp();
