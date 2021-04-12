const cron = require("node-cron");
const fbPostSchema = require("../models/fb_post_model");
const IgPostModel = require("../models/ig_post_model");
const twPostSchema = require("../models/tw_post_model");
const postToFb = require("./post_to_fb");
const postToIg = require("./post_to_ig");
const postToTw = require("./post_to_tw");
const baseEncoding = require("./url_to_base64");
const timeZone = require("timezone-support");

class Cron {
  run() {
    //run every hour
    cron.schedule("0 * * * *", () => {
      console.log("running hourly task...");
      //get all unposted fb post
      fbPostSchema.find({ posted: false }, async (err, fb_post) => {
        for (let fb of fb_post) {
          const london = timeZone.findTimeZone("Europe/London");
          const scheduledTime = timeZone.getZonedTime(
            new Date(fb.schedlue),
            london
          );
          const myTime = timeZone.getZonedTime(new Date(), london);

          if (
            scheduledTime.year === myTime.year &&
            scheduledTime.month === myTime.month &&
            scheduledTime.day <= myTime.day &&
            scheduledTime.dayOfWeek <= myTime.dayOfWeek &&
            myTime.hours >= scheduledTime.hours
          ) {
            if (fb.image == undefined) {
              postToFb.postToFbWithoutImg(fb.text);
              fbPostSchema.findByIdAndUpdate(
                fb._id,
                { posted: true },
                (err) => {}
              );
            } else {
              let encoding = await baseEncoding.convert_url_to_buffer(fb.image);
              postToFb.postToFbWithImg(fb.text, encoding);
              await fbPostSchema.findByIdAndUpdate(fb._id, { posted: true });
            }
          }
        }
      });
      //get all unposted tw post
      twPostSchema.find({ posted: false }, async (err, tw_post) => {
        for (let tw of tw_post) {
          const london = timeZone.findTimeZone("Europe/London");
          const scheduledTime = timeZone.getZonedTime(
            new Date(tw.schedlue),
            london
          );
          const myTime = timeZone.getZonedTime(new Date(), london);
          if (
            scheduledTime.year === myTime.year &&
            scheduledTime.month === myTime.month &&
            scheduledTime.day <= myTime.day &&
            scheduledTime.dayOfWeek <= myTime.dayOfWeek &&
            myTime.hours >= scheduledTime.hours
          ) {
            if (tw.image == undefined) {
              postToTw.PostToTwWithoutImage(tw.text);
              await twPostSchema.findByIdAndUpdate(tw._id, { posted: true });
            } else {
              let encoding = await baseEncoding.convert_url_to_base64(tw.image);
              postToTw.postToTwWithImg(tw.text, encoding);
              await twPostSchema.findByIdAndUpdate(
                tw._id,
                { posted: true },
                (err) => {}
              );
            }
          }
        }
      });
      //get all unposted ig post
      IgPostModel.find({ posted: false }, async (err, ig_post) => {
        for (let ig of ig_post) {
          const london = timeZone.findTimeZone("Europe/London");
          const scheduledTime = timeZone.getZonedTime(
            new Date(ig.schedlue),
            london
          );
          const myTime = timeZone.getZonedTime(new Date(), london);
          if (
            scheduledTime.year === myTime.year &&
            scheduledTime.month === myTime.month &&
            scheduledTime.day <= myTime.day &&
            scheduledTime.dayOfWeek <= myTime.dayOfWeek &&
            myTime.hours >= scheduledTime.hours
          ) {
            postToIg.PostToIg(ig.text, ig.image);
            await IgPostModel.findByIdAndUpdate(
              ig._id,
              { posted: true },
              (err) => {}
            );
          }
        }
      });
    });
  }
}
module.exports = new Cron();
