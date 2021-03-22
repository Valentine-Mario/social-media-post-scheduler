const twSchema = require("../models/tw_model");
const encrpt = require("../lib/encrpt");
const Twit = require("twit");

class PostToTw {
  getTwToken() {
    twSchema.find({}, (err, tw_data) => {
      return new Promise((res, rej) => {
        if (err) {
          rej(err);
        } else {
          res({
            consumer_key: encrpt.decrpt(tw_data[0].consumer_key),
            consumer_secret: encrpt.decrpt(tw_data[0].consumer_secret),
            access_token: encrpt.decrpt(tw_data[0].access_token),
            access_token_secret: encrpt.decrpt(tw_data[0].access_token_secret),
          });
        }
      });
    });
  }

  postToTwWithImg(text, baseEncoding) {
    this.getTwToken().then((token) => {
      var cred = new Twit({
        consumer_key: token.consumer_key,
        consumer_secret: token.consumer_secret,
        access_token: token.access_token,
        access_token_secret: token.access_token_secret,
      });
      cred.post(
        "media/upload",
        { media_data: baseEncoding },
        (err, data, response) => {
          var mediaIdStr = data.media_id_string;
          var altText = text;
          var meta_params = {
            media_id: mediaIdStr,
            alt_text: { text: altText },
          };

          cred.post(
            "media/metadata/create",
            meta_params,
            function (err, data, response) {
              if (!err) {
                var params = {
                  status: text,
                  media_ids: [mediaIdStr],
                };
                cred.post(
                  "statuses/update",
                  params,
                  function (err, data, response) {
                    console.log(data);
                  }
                );
              }
            }
          );
        }
      );
    });
  }
  PostToTwWithoutText(text) {
    this.getTwToken().then((token) => {
      var cred = new Twit({
        consumer_key: token.consumer_key,
        consumer_secret: token.consumer_secret,
        access_token: token.access_token,
        access_token_secret: token.access_token_secret,
      });
      cred.post(
        "statuses/update",
        { status: text },
        function (err, data, response) {
          console.log(data);
        }
      );
    });
  }
}

module.exports = new PostToTw();
