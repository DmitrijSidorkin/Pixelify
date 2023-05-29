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
      gamesArray: Array,
      imgLink: String,
      gameName: String,
      userGuess: Boolean,
      userGuessText: String,
    },
  ],
  sessionStarted: Number,
  sessionEnded: Boolean,
  sessionScore: Number,
  sessionEnd: Number,
});

const PlaySession = mongoose.model("playSession", PlaySessionSchema);

module.exports = PlaySession;
