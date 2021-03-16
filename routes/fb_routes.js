var express = require("express");
var router = express.Router();
var fbController = require("../controller/fbController");

router.post("/update", fbController.updateAcc);
router.post("/add", fbController.AddPost);
router.post("/update/:id", fbController.updatePost);
router.get("/delete/:id", fbController.deletePost);
router.post("/get", fbController.getPost);

module.exports = router;
