const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
});
const User = new mongoose.model("User", userSchema);
module.exports=User;
