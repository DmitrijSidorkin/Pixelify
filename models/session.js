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
      gameName: { type: String },
      imgLink: { type: String },
      userGuess: { type: Boolean },
    },
  ],
});

const PlaySession = mongoose.model("playSession", PlaySessionSchema);

module.exports = PlaySession;

// module.exports = mongoose.model("Session", SessionSchema);
