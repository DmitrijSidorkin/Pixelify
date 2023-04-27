const Jimp = require("jimp");
const axios = require("axios");

const { ROUTES } = require("../controllers/routes");
// const { generateUniqueRandomArr } = require("./helpers");

const apiUrl = "https://api.rawg.io/api/";
// const apiParams = "page_size=40&parent_platforms=1,2,3,4&ordering=-metacritic";

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
      const randGameId = Math.floor(Math.random() * 100000 + 1);
      response = await axios.get(
        `${apiUrl}games/${randGameId}?key=${process.env.RAWG_KEY}`
      );
      if (response.background_image) {
        success = true;
        break;
      }
    } catch (error) {
      if (process.env.IN_DEVELOPMENT === "true") {
        console.log(error.response.status);
      }
      if (retries == maxRetries) {
        req.session.error = error.response.status;
        res.redirect(ROUTES.error);
      }
    }
    retries++;
  }
  if (response) {
    req.gameData = response.data;
    if (process.env.IN_DEVELOPMENT === "true") {
      console.log(req.gameData);
    }
    next();
  }
};

// module.exports.fetchRandomGameDataArr = async (req, res, next) => {
//   const pageNumArr = generateUniqueRandomArr();
//   let gameDataArr = [];
//   for (let num of pageNumArr) {
//     let response = await axios.get(
//       `${apiUrl}games?key=${process.env.RAWG_KEY}&page=${pageNumArr[num]}&${apiParams}`
//     );
//     response.data.results.forEach((result) => {
//       if (result.background_image) {
//         gameDataArr.push({ name: result.name, image: result.background_image });
//       }
//     });
//   }
//   console.log(gameDataArr);
//   req.gameDataArr = gameDataArr;
//   next();
// };

module.exports.getPixelatedImage = async (image, pixelationDegree = 10) => {
  console.log(pixelationDegree);
  const originalImage = await Jimp.read(image);
  const pixelatedImage = await originalImage
    .pixelate(10)
    .getBase64Async(Jimp.MIME_JPEG);
  return pixelatedImage;
};
