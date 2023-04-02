const Jimp = require("jimp");
const axios = require("axios");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }
  next();
};

module.exports.fetchRandomGameData = async (req, res, next) => {
  const randGameId = Math.floor(Math.random() * 1000 + 1);
  const results = await axios.get(
    `https://api.rawg.io/api/games/${randGameId}?key=42d3994083024d64aebad13f6568556c`
  );
  console.log(results);
  req.gameData = results.data;

  next();
};

module.exports.getPixelatedImage = async (image) => {
  const originalImage = await Jimp.read(image);
  const pixelatedImage = await originalImage
    .pixelate(10)
    .getBase64Async(Jimp.MIME_JPEG);
  return pixelatedImage;
};
