const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaySessionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    requires: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  sessionData: [
    {
      gamesArray: { type: Array },
      imgLink: { type: String },
      gameName: { type: String },
      userGuess: { type: Boolean },
      userGuessText: { type: String },
    },
  ],
  sessionEnded: { type: Boolean },
});

const PlaySession = mongoose.model("playSession", PlaySessionSchema);

module.exports = PlaySession;
