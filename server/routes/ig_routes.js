var express = require("express");
var igController = require("../controller/igController");
var router = express.Router();

router.post("/update", igController.UpdateAcc);
router.post("/add", igController.AddPost);
router.post("/update/:id", igController.updatePost);
router.get("/delete/:id", igController.deletePost);
router.get("/get", igController.getPost);

module.exports = router;
