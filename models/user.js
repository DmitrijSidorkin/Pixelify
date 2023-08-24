const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_300");
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  displayName: String,
  profileImg: ImageSchema,
  realName: String,
  birthDate: String,
  country: String,
  location: String,
  bio: String,
  bestScores: {
    //1/2/3/4/5 represent sessiong difficulty
    //3/5/7/9/11 represent session length
    1: { 3: Number, 5: Number, 7: Number, 9: Number, 11: Number },
    2: { 3: Number, 5: Number, 7: Number, 9: Number, 11: Number },
    3: { 3: Number, 5: Number, 7: Number, 9: Number, 11: Number },
    4: { 3: Number, 5: Number, 7: Number, 9: Number, 11: Number },
    5: { 3: Number, 5: Number, 7: Number, 9: Number, 11: Number },
  },
  customSessionHighScores: {},
  mediaLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    tumblr: String,
  },
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
module.exports = User;
