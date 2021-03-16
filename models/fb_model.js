var mongoose = require("mongoose");

var fbSchema = mongoose.Schema({
  token: { type: String, required: true },
});
module.exports = mongoose.model("fbModel", fbSchema);
