const Jimp = require("jimp");
const axios = require("axios");

const { ROUTES } = require("./controllers/routes");

require("dotenv").config();

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }
  next();
};

module.exports.fetchRandomGameData = async (req, res, next) => {
  let response = null;
  let retries = 1;
  let success = false;
  const maxRetries = 5;

  while (retries <= maxRetries && !success) {
    try {
      const randGameId = Math.floor(Math.random() * 500000 + 1);
      response = await axios.get(
        `https://api.rawg.io/api/games/${randGameId}?key=${process.env.RAWG_KEY}`
      );
      success = true;
      break;
    } catch (error) {
      console.log(error.response.status);
      if (retries == maxRetries) {
        req.session.error = error.response.status;
        res.redirect(ROUTES.error);
      }
    }
    retries++;
  }
  if (response) {
    req.gameData = response.data;
    console.log(req.gameData);
    next();
  }
};

module.exports.getPixelatedImage = async (image) => {
  const originalImage = await Jimp.read(image);
  const pixelatedImage = await originalImage
    .pixelate(10)
    .getBase64Async(Jimp.MIME_JPEG);
  return pixelatedImage;
};
