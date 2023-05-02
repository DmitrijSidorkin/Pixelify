const { v4: uuidv4 } = require("uuid");

const PlaySession = require("../models/session");
const { getPixelatedImage } = require("../middleware");

const {
  cardStyle,
  resultsStyle,
} = require("../public/javascripts/extraStyles.js");

module.exports.renderPlaySettings = (req, res) => {
  res.render("./main/play-settings.ejs", {
    playSessionId: uuidv4(),
    extraStyles: cardStyle,
    previewImage:
      "https://res.cloudinary.com/dyguovdbc/image/upload/v1676908287/pixelify/placeholder-image_ykgw2b.jpg",
  });
};

module.exports.renderPlay = async (req, res) => {
  const image = await getPixelatedImage(req.gameData.background_image);

  res.render("main/play.ejs", {
    image,
    gameName: req.gameData.name,
    imgLink: req.gameData.background_image,
    extraStyles: cardStyle,
  });
};

module.exports.sendPlayData = async (req, res, next) => {
  const id = uuidv4();
  const playSession = new PlaySession({
    userId: req.user.username,
    sessionId: id,
    difficulty: req.body.difficulty,
    length: req.body.sessionLength,
  });
  console.log(playSession);
  await playSession.save();
  res.redirect("/play");
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

module.exports.renderResults = (req, res) => {
  res.render("main/results.ejs", {
    extraStyles: resultsStyle,
  });
};

// module.exports.postPlaySettings = async () => {
//   console.log("reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
// };
