const { v4: uuidv4 } = require("uuid");

const PlaySession = require("../models/session");
const { getPixelatedImage } = require("../middleware");
const playSettingsImage =
  "https://res.cloudinary.com/dyguovdbc/image/upload/v1676908287/pixelify/placeholder-image_ykgw2b.jpg";

const { fetchPlaySessionData } = require("../middleware/helpers");
const {
  cardStyle,
  resultsStyle,
  detailedResultsStyle,
} = require("../public/javascripts/extraStyles.js");

module.exports.renderPlaySettings = (req, res) => {
  res.render("./main/play-settings.ejs", {
    extraStyles: cardStyle,
    previewImage: playSettingsImage,
  });
};

module.exports.renderPlay = async (req, res) => {
  const playSessionData = await fetchPlaySessionData(req.user.username);
  const pageNum = playSessionData.sessionData.length + 1;
  const image = await getPixelatedImage(
    req.gameData.background_image,
    playSessionData.difficulty
  );
  res.render("main/play.ejs", {
    image,
    gameName: req.gameData.name,
    imgLink: req.gameData.background_image,
    extraStyles: cardStyle,
    sessionLength: playSessionData.length,
    sessionId: playSessionData.sessionId,
    pageNum,
  });
};

module.exports.sendPlayData = async (req, res, next) => {
  const id = uuidv4();
  const playSession = new PlaySession({
    userId: req.user?.username || "guest",
    sessionId: id,
    difficulty: req.body.difficulty,
    length: req.body.sessionLength,
  });
  await playSession.save();
  res.redirect("/play");
  next();
};

module.exports.updatePlayData = async (req, res, next) => {
  const guessData = {
    gameName: req.body.gameName,
    imgLink: req.body.imageLink,
    userGuess: req.body.guess === req.body.gameName,
  };
  await PlaySession.updateOne(
    { sessionId: req.body.sessionId },
    { $push: { sessionData: guessData } }
  );
  const playSessionData = await fetchPlaySessionData(req.user.username);
  if (playSessionData.length === parseInt(req.body.pageNum)) {
    res.redirect("/results");
  }
  res.redirect("/play");
  next();
};

module.exports.renderResults = async (req, res, next) => {
  const playSessionData = JSON.stringify(
    await fetchPlaySessionData(req.user.username)
  );
  res.render("main/results", {
    extraStyles: resultsStyle,
    playSessionData,
  });
  next();
};

module.exports.renderDetailedResults = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const playSessionData = JSON.stringify(
    await PlaySession.findOne({ sessionId: id })
  );
  console.log(playSessionData);
  res.render("main/detailed-results", {
    extraStyles: detailedResultsStyle,
    playSessionData,
  });
  next();
};

// module.exports.renderTest = async (req, res) => {
//   const image = await getPixelatedImage(req.gameData.background_image);

//   res.render("main/test.ejs", {
//     image,
//     gameName: req.gameData.name,
//     imgLink: req.gameData.background_image,
//     extraStyles: cardStyle,
//   });
// };
