const transactionsCollection = require("../DB/Models/transactions.model");
const usersCollection = require("../DB/Models/users.model");

const handleChargeSuccess = async (reference) => {
  try {
    // Update transaction in db
    const updated_Transacation = await transactionsCollection.findOneAndUpdate(
      { reference, status: "Processing" },
      { status: "Successful" },
      { new: true },
    );

    console.log(updated_Transacation);

    if (!updated_Transacation) {
      return { alreadyProcessed: true }; // Transaction was already processed or not found
    }

    const updated_Amount = updated_Transacation.amount;

    // Updates user balance in db
    const updated_User_Balance = await usersCollection.findByIdAndUpdate(
      updated_Transacation.userId,
      { $inc: { balance: updated_Amount } },
      { new: true },
    );

    console.log(updated_User_Balance);
    return { processed: true };
  } catch (error) {
    throw new Error("Error processing successful charge: " + error.message);
  }
};

const handleChargeFailure = async (reference) => {
  try {
    // Marks transaction as failed in db
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
