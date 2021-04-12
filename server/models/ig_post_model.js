var mongoose = require("mongoose");

var igPostSchema = mongoose.Schema({
  image: { type: String, required: true },
  text: { type: String, required: true },
  posted: { type: Boolean, default: false },
  schedlue: { type: Date, required: true },
});
module.exports = mongoose.model("igPostModel", igPostSchema);
