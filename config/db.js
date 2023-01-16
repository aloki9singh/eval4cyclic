const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.mongooseurl);
module.exports = {
  connection,
};
