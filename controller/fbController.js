const encrpt = require("../lib/encrpt");
const fbSchema = require("../models/fb_model");
const cloudinary = require("../lib/cloud");
const fbPostSchema = require("../models/fb_post_model");
class fbController {
  updateAcc(req, res) {
    let data = {
      token: encrpt.encrypt(req.body.token),
    };
    try {
      fbSchema.find({}, (err, fb_data) => {
        if (fb_data.length < 1) {
          //if cred do not exist, create
          fbSchema.create(data, (err, igData) => {
            if (err) {
              return res.json({ success: false, message: err });
            } else {
              return res.json({
                success: true,
                message: "fb credentials uploaded successfully",
              });
            }
          });
        } else {
          //if cred exist, update
          fbSchema.findByIdAndUpdate(fb_data[0]._id, data, (err) => {
            if (err) {
              return res.json({ success: false, message: err });
            } else {
              return res.json({
                success: true,
                message: "fb credentials uploaded successfully",
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
      fbSchema.find({}, (err, fb_data) => {
        if (fb_data < 1) {
          return res.json({
            success: false,
            message: "upload a facebook token before you schedule a post",
          });
        } else {
          if (data.image) {
            cloudinary.pics_upload(data.image.image.data).then((file_data) => {
              data.image = file_data.secure_url;
              fbPostSchema.create(data, (err, post) => {
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
            fbPostSchema.create(data, (err, post) => {
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
      fbPostSchema.findByIdAndUpdate(id, data, (err) => {
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
      fbPostSchema.findByIdAndRemove(id, (err) => {
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
      fbPostSchema.find({ posted: data.posted }, (err, post) => {
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
module.exports = new fbController();
