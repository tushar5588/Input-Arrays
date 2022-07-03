const User = require("../model/user");

exports.addUser = async function (req, res) {
  const data = req.body;
  try {
    data.map(async (obj) => {
      const name = obj?.name;
      const email = obj?.email;
      const username = obj?.username;
      await User.create({
        name,
        email,
        username,
      });
    });
    res.status(200).json({ status: 1, message: "Data added successfully." });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
exports.getUser = async function (req, res) {
  try {
    await User.find().then((data) => {
      res
        .status(200)
        .json({ status: 1, data: data, message: "Data fetched successfully" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
