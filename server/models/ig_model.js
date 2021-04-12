var mongoose = require("mongoose");

var IgSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
module.exports = mongoose.model("igModel", IgSchema);
