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
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    8: Number,
  },
  customSessionHighScores: {},
  mediaLinks: {},
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
module.exports = User;
