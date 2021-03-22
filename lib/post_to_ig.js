const IgSchema = require("../models/ig_model");
const encrpt = require("../lib/encrpt");
const Instagram = require("instagram-web-api");

class PostToIg {
  getIgToken() {
    IgSchema.find({}, (err, ig_data) => {
      return new Promise((res, rej) => {
        if (err) {
          rej(err);
        } else {
          res({
            username: ig_data[0].username,
            password: encrpt.decrpt(ig_data[0].password),
          });
        }
      });
    });
  }

  PostToIg(text, url) {
    this.getIgToken().then(async (cred) => {
      const { username, password } = cred;
      const client = new Instagram({ username, password });

      const { media } = await client.uploadPhoto({
        photo: url,
        caption: text,
        post: "feed",
      });
      console.log(
        `uplooade successful https://www.instagram.com/p/${media.code}/`
      );
    });
  }
}

module.exports = new PostToIg();
