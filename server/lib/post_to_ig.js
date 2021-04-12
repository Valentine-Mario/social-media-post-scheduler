const IgSchema = require("../models/ig_model");
const encrpt = require("../lib/encrpt");
const Instagram = require("instagram-web-api");

class PostToIg {
  async getIgToken() {
    try {
      let data = await IgSchema.find({});
      return new Promise((res, _rej) => {
        res({
          username: data[0].username,
          password: encrpt.decrpt(data[0].password),
        });
      });
    } catch (e) {
      console.log("Error", e);
    }
  }

  PostToIg(text, url) {
    this.getIgToken().then(async (cred) => {
      try {
        const { username, password } = cred;
        const client = new Instagram({
          username: username,
          password: password,
        });
        client.login().then(async () => {
          const { media } = await client.uploadPhoto({
            photo: url,
            caption: text,
            post: "feed",
          });
          console.log(
            `uploaded successful https://www.instagram.com/p/${media.code}/`
          );
        });
      } catch (e) {
        console.log("Error", e);
      }
    });
  }
}

module.exports = new PostToIg();
