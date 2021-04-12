const IgSchema = require("../models/ig_model");
const encrpt = require("../lib/encrpt");
const IgPostModel = require("../models/ig_post_model");
const cloudinary = require("../lib/cloud");

class IgController {
  UpdateAcc(req, res) {
    let data = {
      username: req.body.username,
      password: encrpt.encrypt(req.body.password),
    };
    try {
      IgSchema.find({}, (err, ig_data) => {
        if (ig_data.length < 1) {
          //if cred do not exist, create
          IgSchema.create(data, (err, igData) => {
            if (err) {
              return res.json({ success: false, message: err });
            } else {
              return res.json({
                success: true,
                message: "ig credentials uploaded successfully",
              });
            }
          });
        } else {
          //if cred exist, update
          IgSchema.findByIdAndUpdate(ig_data[0]._id, data, (err) => {
            if (err) {
              return res.json({ success: false, message: err });
            } else {
              return res.json({
                success: true,
                message: "ig credentials uploaded successfully",
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
      IgSchema.find({}, (err, ig_data) => {
        if (ig_data < 1) {
          return res.json({
            success: false,
            message: "upload a instagram token before you schedule a post",
          });
        } else {
          if (data.image) {
            cloudinary.pics_upload(data.image.image.data).then((file_data) => {
              data.image = file_data.secure_url;
              IgPostModel.create(data, (err, post) => {
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
            IgPostModel.create(data, (err, post) => {
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
      IgPostModel.findByIdAndUpdate(id, data, (err) => {
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
      IgPostModel.findByIdAndRemove(id, (err) => {
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
    let data = {
      posted: req.body.posted,
    };
    try {
      IgPostModel.find({ posted: data.posted }, (err, post) => {
        if (err) {
          return res.json({
            success: false,
            message: "error getting post",
            err: err,
          });
        } else {
          return res.json({ success: true, message: post });
        }
      });
    } catch (e) {
      console.log(e);
      res.json({ success: false, err: e });
    }
  }
}
module.exports = new IgController();
