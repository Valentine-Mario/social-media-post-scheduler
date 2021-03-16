var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var fileUpload = require("express-fileupload");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var igRoutes = require("./routes/ig_routes");
var fbRoutes = require("./routes/fb_routes");
var twRoutes = require("./routes/tw_routes");
const cron = require("./lib/cron");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/ig", igRoutes);
app.use("/fb", fbRoutes);
app.use("/tw", twRoutes);
cron.run();

var url = process.env.MONGODB_DEV;
mongoose.Promise = global.Promise;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
