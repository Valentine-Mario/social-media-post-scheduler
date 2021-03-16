var mongoose = require("mongoose");

var TwSchema = mongoose.Schema({
  consumer_key: { type: String, required: true },
  consumer_secret: { type: String, required: true },
  access_token: { type: String, required: true },
  access_token_secret: { type: String, required: true },
});
module.exports = mongoose.model("twModel", TwSchema);
