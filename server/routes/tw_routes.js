var express = require("express");
var router = express.Router();
var twController = require("../controller/twController");

router.post("/update", twController.updateAcc);
router.post("/add", twController.AddPost);
router.post("/update/:id", twController.updatePost);
router.get("/delete/:id", twController.deletePost);
router.get("/get", twController.getPost);

module.exports = router;
