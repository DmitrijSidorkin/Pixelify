const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameDataSchema = new Schema({
  gameId: {
    type: Number,
    required: true,
  },
  gameName: {
    type: String,
    required: true,
  },
  metaScore: {
    type: Number,
  },
  genres: {
    type: Array,
  },
  platforms: {
    type: Array,
  },
  stores: {
    type: Array,
  },
  website: {
    type: String,
  },
});

const GameData = mongoose.model("gameData", GameDataSchema);

module.exports = GameData;
