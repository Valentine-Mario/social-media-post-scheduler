require("dotenv").config();
var cloudinary = require("cloudinary");
let streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

class cloud {
  pics_upload(data) {
    return new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "scheduled",
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(data).pipe(cld_upload_stream);
    });
  }
}

module.exports = new cloud();
