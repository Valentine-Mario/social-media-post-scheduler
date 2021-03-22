var Cryptr = require("cryptr");
var cryptr = new Cryptr(process.env.ENCRYPT_SECRET);
const post = require("./post_to_fb");
class Encrypt {
  encrypt(data) {
    return cryptr.encrypt(data);
  }
  decrpt(data) {
    return cryptr.decrypt(data);
  }
}

module.exports = new Encrypt();
