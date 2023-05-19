const Jimp = require("jimp");
const axios = require("axios");

const { ROUTES } = require("../controllers/routes");
const {
  calculatePixelationDegree,
  generateUniqueRandomArr,
  generateRandomNum,
} = require("./helpers");

const apiUrl = "https://api.rawg.io/api/";
const apiParams = "parent_platforms=1,2,3,4&ordering=-metacritic";

require("dotenv").config();

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }
  next();
};

module.exports.fetchFromApi = async (maxPage, pageSize = 1) => {
  let response = null;
  let success = false;
  let retries = 1;
  const maxRetries = 5;

  while (retries <= maxRetries && !success) {
    try {
      const randGameId = generateRandomNum(maxPage);
      response = await axios.get(
        `${apiUrl}games?key=${process.env.RAWG_KEY}&page=${randGameId}&page_size=${pageSize}&${apiParams}`
      );
      if (response.data.results[0].background_image) {
        success = true;
        break;
      }
    } catch (error) {
      if (process.env.IN_DEVELOPMENT === "true") {
        console.log(error.response.status);
      }
      if (retries === maxRetries) {
        console.log(error.response);
        return error.response;
      }
    }
    retries++;
  }
  return response;
};

module.exports.fetchRandomGameData = async (req, res, next) => {
  const maxPage = 6720;

  const response = await this.fetchFromApi(maxPage);
  if (response.status >= 400) {
    req.session.error = response.status;
    res.redirect(ROUTES.error);
  }
  if (response) {
    req.gameData = response.data.results[0];
  }

  next();
};

module.exports.fetchRandomGameDataArr = async (req, res) => {
  const maxPage = 168;
  const pageSize = 40;
  const gameNumArr = generateUniqueRandomArr(40, 4);

  let filteredGamesData = { gamesArray: [] };

  const response = await this.fetchFromApi(maxPage, pageSize);

  if (response.status >= 400) {
    req.session.error = response.status;
    res.redirect(ROUTES.error);
  }

  if (response) {
    filteredGamesData.background_image =
      response.data.results[gameNumArr[0]].background_image;
    filteredGamesData.name = response.data.results[gameNumArr[0]].name;
    gameNumArr.forEach((num) => {
      const game = {
        gameName: response.data.results[num].name,
        gameId: response.data.results[num].id,
      };
      filteredGamesData.gamesArray.push(game);
    });
    filteredGamesData.gamesArray.sort((a, b) => a.gameId - b.gameId);
    return filteredGamesData;
  }
};

module.exports.getPixelatedImage = async (image, difficulty = 3) => {
  const originalImage = await Jimp.read(image);
  const minDimension = Math.min(
    originalImage.bitmap.width,
    originalImage.bitmap.height
  );
  const pixelationDegree = calculatePixelationDegree(minDimension, difficulty);
  const pixelatedImage = await originalImage
    .pixelate(pixelationDegree)
    .getBase64Async(Jimp.MIME_JPEG);
  return pixelatedImage;
};

//leaving the old fetchRandomGameData middleware here for now just in case, will remove it after the comment reviews

// module.exports.fetchRandomGameData = async (req, res, next) => {
//   let response = null;
//   let retries = 1;
//   let success = false;
//   const maxRetries = 5;
//   const maxGameId = 6720;
//   const pageSize = 1;

//   while (retries <= maxRetries && !success) {
//     try {
//       const randGameId = generateRandomNum(maxGameId);
//       response = await axios.get(
//         `${apiUrl}games?key=${process.env.RAWG_KEY}&page=${randGameId}&page_size=${pageSize}&${apiParams}`
//       );
//       if (response.data.results[0].background_image) {
//         success = true;
//         break;
//       }
//     } catch (error) {
//       if (process.env.IN_DEVELOPMENT === "true") {
//         console.log(error.response.status);
//       }
//       if (retries === maxRetries) {
//         req.session.error = error.response.status;
//         res.redirect(ROUTES.error);
//       }
//     }
//     retries++;
//   }
//   if (response) {
//     req.gameData = response.data.results[0];

//     next();
//   }
// };
