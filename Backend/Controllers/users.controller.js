const usersCollection = require("../DB/Models/users.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await usersCollection.find();

    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "An error occured" });
  }
};

module.exports = {getAllUsers}