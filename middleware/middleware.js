const axios = require("axios");

const { ROUTES } = require("../controllers/routes");
const { generateUniqueRandomArr, generateRandomNum } = require("./helpers");

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

  const filteredGamesData = { gamesArray: [] };

  const response = await this.fetchFromApi(maxPage, pageSize);

  if (response.status === 200) {
    filteredGamesData.background_image =
      response.data.results[gameNumArr[0]].background_image;
    filteredGamesData.name = response.data.results[gameNumArr[0]].name;
    filteredGamesData.gameId = response.data.results[gameNumArr[0]].id;
    gameNumArr.forEach((num) => {
      filteredGamesData.gamesArray.push({
        gameName: response.data.results[num].name,
        gameId: response.data.results[num].id,
      });
    });
    filteredGamesData.gamesArray.sort((a, b) => a.gameId - b.gameId);
    return filteredGamesData;
  }

  req.session.error = response.status;
  res.redirect(ROUTES.error);
};

module.exports.calculateScore = (session, sessionEnd) => {
  const difficultyModifier = 0.5 + 0.5 * session.difficulty;
  const msPerGuess = 15000;
  const baseGuessScore = 1000;
  const baseTimeBonusPoints = 50;

  let correctAnswers = 0;

  session.sessionData.forEach((guess) => {
    if (guess.userGuess === true) {
      correctAnswers++;
    }
  });

  const guessAccuracy = correctAnswers / session.length;
  const guessesScore = baseGuessScore * difficultyModifier * correctAnswers;
  const bonusTime =
    msPerGuess * session.length - (sessionEnd - session.sessionStartTime);

  if (bonusTime <= 0) {
    return guessesScore;
  } else {
    const timeBonusScore = Math.floor(
      (bonusTime / 1000) *
        difficultyModifier *
        baseTimeBonusPoints *
        guessAccuracy
    );

    return guessesScore + timeBonusScore;
  }
};
