const twSchema = require("../models/tw_model");
const encrpt = require("../lib/encrpt");
const twPostSchema = require("../models/tw_post_model");
const cloudinary = require("../lib/cloud");

class TwController {
  updateAcc(req, res) {
    let data = {
      consumer_key: encrpt.encrypt(req.body.consumer_key),
      consumer_secret: encrpt.encrypt(req.body.consumer_secret),
      access_token: encrpt.encrypt(req.body.access_token),
      access_token_secret: encrpt.encrypt(req.body.access_token_secret),
    };
    try {
      twSchema.find({}, (err, tw_data) => {
        if (tw_data.length < 1) {
          //if cred do not exist, create
          twSchema.create(data, (err, twData) => {
            if (err) {
              return res.json({ success: false, message: err });
            } else {
              return res.json({
                success: true,
                message: "tw credentials uploaded successfully",
              });
            }
          });
        } else {
          //if cred exist, update
          twSchema.findByIdAndUpdate(tw_data[0]._id, data, (err) => {
            if (err) {
              return res.json({ success: false, message: err });
            } else {
              return res.json({
                success: true,
                message: "tw credentials uploaded successfully",
              });
            }
          });
        }
      });
    } catch (e) {
      console.log(e);
      res.json({ success: false, err: e });
    }
  }

  AddPost(req, res) {
    let data = {
      image: req.files,
      text: req.body.text,
      schedlue: new Date(req.body.schedlue),
    };
    try {
      twSchema.find({}, (err, tw_data) => {
        if (tw_data < 1) {
          return res.json({
            success: false,
            message: "upload a twitter token before you schedule a post",
          });
        } else {
          if (data.image) {
            cloudinary.pics_upload(data.image.image.data).then((file_data) => {
              data.image = file_data.secure_url;
              twPostSchema.create(data, (err, post) => {
                if (err) {
                  return res.json({
                    success: false,
                    message: "error schedulng post",
                    err: err,
                  });
                } else {
                  return res.json({
                    success: true,
                    message: "post scheduled successfully",
                    data: post,
                  });
                }
              });
            });
          } else {
            twPostSchema.create(data, (err, post) => {
              if (err) {
                return res.json({
                  success: false,
                  message: "error schedulng post",
                  err: err,
                });
              } else {
                return res.json({
                  success: true,
                  message: "post scheduled successfully",
                  data: post,
                });
              }
            });
          }
        }
      });
    } catch (e) {
      console.log(e);
      res.json({ success: false, err: e });
    }
  }

  updatePost(req, res) {
    let id = { _id: req.params.id };
    let data = {
      text: req.body.text,
      schedlue: new Date(req.body.schedlue),
    };
    try {
      twPostSchema.findByIdAndUpdate(id, data, (err) => {
        if (err) {
          return res.json({
            success: false,
            message: "error updating post",
            err: err,
          });
        } else {
          return res.json({
            success: true,
            message: "post updated successfully",
          });
        }
      });
    } catch (e) {
      console.log(e);
      res.json({ success: false, err: e });
    }
  }

  deletePost(req, res) {
    let id = { _id: req.params.id };
    try {
      twPostSchema.findByIdAndRemove(id, (err) => {
        if (err) {
          return res.json({
            success: false,
            message: "error deleting post",
            err: err,
          });
        } else {
          return res.json({
            success: true,
            message: "post deleted successfully",
          });
        }
      });
    } catch (e) {
      console.log(e);
      res.json({ success: false, err: e });
    }
  }

  getPost(req, res) {
    try {
      twPostSchema.find({}, (err, post) => {
        if (err) {
          return res.json({
            success: false,
            message: "error getting post",
            err: err,
          });
        } else {
          return res.json({
            success: true,
            message: "data gotten successfully",
            data: post,
          });
        }
      });
    } catch (e) {
      console.log(e);
      res.json({ success: false, err: e });
    }
  }
}
module.exports = new TwController();
