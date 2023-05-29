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

const personalHighScoresSchema = new Schema({
  veryEasy: Number,
  easy: Number,
  medium: Number,
  hard: Number,
  veryHard: Number,
  customSessionHighScores: {},
});
const personalHighScore = mongoose.model(
  "PersonalHighScore",
  personalHighScoresSchema
);
module.exports = personalHighScore;

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
  highScores: {
    type: Schema.Types.ObjectId,
    ref: "PersonalHighScore",
  },
  mediaLinks: {},
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
module.exports = User;
