const FB = require("fb");
const fbSchema = require("../models/fb_model");
const encrpt = require("../lib/encrpt");
const fs = require("fs");

class PostToFb {
  async getFbToken() {
    try {
      let data = await fbSchema.find({});
      return new Promise((res, _rej) => {
        res(encrpt.decrpt(data[0].token));
      });
    } catch (e) {
      console.log("Error", e);
    }
  }
  postToFbWithImg(text, buffer) {
    this.getFbToken().then(async (token) => {
      FB.setAccessToken(token);
      await FB.api(
        "me/photos",
        "post",
        {
          source: buffer,
          caption: text,
        },
        function (res) {
          if (!res || res.error) {
            console.log(!res ? "error occurred" : res.error);
            return;
          } else {
            console.log("Post Id: " + res.post_id);
            return;
          }
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
