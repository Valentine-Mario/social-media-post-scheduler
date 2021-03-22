const FB = require("fb");
const fbSchema = require("../models/fb_model");
const encrpt = require("./encrpt");

class PostToFb {
  getFbToken() {
    fbSchema.find({}, (err, fb_data) => {
      return new Promise((res, rej) => {
        if (err) {
          rej(err);
        } else {
          res(encrpt.decrpt(fb_data[0].token));
        }
      });
    });
  }

  postToFbWithImg(text, baseEncoding) {
    this.getFbToken().then((token) => {
      FB.setAccessToken(token);

      FB.api(
        "me/photos",
        "post",
        {
          source: baseEncoding,
          caption: text,
        },
        (res) => {
          if (!res || res.error) {
            console.log(!res ? "error occurred" : res.error);
            return;
          }
          console.log("Post Id: " + res.post_id);
        }
      );
    });
  }

  postToFbWithoutImg(text) {
    this.getFbToken().then((token) => {
      FB.setAccessToken(token);
      FB.api("me/feed", "post", { message: text }, (res) => {
        if (!res || res.error) {
          console.log(!res ? "error occurred" : res.error);
          return;
        }
        console.log("Post Id: " + res.id);
      });
    });
  }
}

module.exports = new PostToFb();
