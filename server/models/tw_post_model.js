var mongoose = require("mongoose");

var twPostSchema = mongoose.Schema({
  image: { type: String },
  text: { type: String, required: true },
  posted: { type: Boolean, default: false },
  schedlue: { type: Date, required: true },
});
module.exports = mongoose.model("twPostModel", twPostSchema);
