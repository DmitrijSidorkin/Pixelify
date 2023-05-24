const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_150");
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
  profileImg: ImageSchema,
  realName: {
    type: String,
  },
  birthDate: {
    type: String,
  },
  country: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  mediaLinks: {},
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
module.exports = User;
