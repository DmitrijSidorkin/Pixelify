const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
  profileImg: {},
  realName: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  gender: {},
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
