const transactionsCollection = require("../DB/Models/transactions.model");
const usersCollection = require("../DB/Models/users.model");

const handleChargeSuccess = async (reference) => {
  // Update transaction in db
  try {
    const updated_Transacation = await transactionsCollection.findOneAndUpdate(
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
  } catch (error) {
    throw new Error("Error processing successful charge: " + error.message);
  }
};

const handleChargeFailure = async (reference) => {
  try {
    await transactionsCollection.findOneAndUpdate(
      { reference, status: "Processing" },
      { status: "Failed" },
      { new: true },
    );
  } catch (error) {
    throw new Error("Error processing failed charge: " + error.message);
  }
};

module.exports = { handleChargeSuccess, handleChargeFailure };
