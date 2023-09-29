const { v4: uuidv4 } = require("uuid");

const PlaySession = require("../models/session");
const User = require("../models/user");
const GameData = require("../models/game-data");
const {
  fetchRandomGameDataArr,
  calculateScore,
  dataSchemaValidation,
} = require("../middleware");
const { fetchPlaySessionData } = require("../middleware/helpers");
const {
  cardStyle,
  resultsStyle,
  detailedResultsStyle,
  mediaButtonsStyle,
} = require("../public/javascripts/extraStyles.js");
const { lengthSettingsOptions } = require("../middleware/remaps");
const { remapDifficultyTexts } = require("../public/helpers.js");
const { pixelateImageFromURL } = require("../middleware/imagePixelation");
const { getTop10Users } = require("../middleware/helpers.js");
const { schemas } = require("../schemas");

module.exports.playOrContinue = async (req, res) => {
  if (req.user?._id) {
    const lastSessionData = await fetchPlaySessionData(req.user._id);
    if (lastSessionData !== null) {
      if (
        lastSessionData.sessionData.length &&
        lastSessionData.sessionData.length !== lastSessionData.length
      ) {
        res.redirect("/play/continue");
      }
    }
  }
  res.redirect("/play-settings");
};

module.exports.renderPlaySettings = (req, res) => {
  res.render("./main/play-settings.ejs", {
    extraStyles: cardStyle,
    remapDifficultyTexts,
    lengthSettingsOptions,
  });
};

module.exports.renderContinue = async (req, res) => {
  if (!req.user._id) {
    res.redirect("/play-settings");
  }
  const user = req.user._id;
  const lastSessionData = await fetchPlaySessionData(user);
  const image = await pixelateImageFromURL(
    lastSessionData.sessionData[lastSessionData.sessionData.length - 1].imgLink,
    lastSessionData.difficulty
  );
  const sessionData = {
    difficulty: remapDifficultyTexts[lastSessionData.difficulty],
    length: lastSessionData.length,
    progress: lastSessionData.sessionData.length,
    id: lastSessionData.sessionId,
    image,
  };

  res.render("main/continue.ejs", { extraStyles: cardStyle, sessionData });
};

module.exports.fetchPlayGameData = async (req, res) => {
  const { id, pageNum } = req.params;
  const playSessionData = await PlaySession.findOne({ sessionId: id });
  const sessionLength = playSessionData.length;
  if (playSessionData.sessionEnded) {
    res.redirect("/results");
  }
  let pageGameData;
  const userGuessText =
    playSessionData.sessionData[parseInt(pageNum - 1)]?.userGuessText || "";

  //checking if the page doesnt have play data yet
  if (pageNum > playSessionData.sessionData.length) {
    //fetching new game data
    const gameData = await fetchRandomGameDataArr();
    pageGameData = {
      gamesArray: gameData.gamesArray,
      gameName: gameData.name,
      gameId: gameData.gameId,
      imgLink: gameData.background_image,
      userGuess: false,
      userGuessText,
    };
    //updating session data in mongodb
    await PlaySession.updateOne(
      { sessionId: id },
      { $push: { sessionData: pageGameData } }
    );

    const updatedSessionData = await PlaySession.findOne({ sessionId: id });
    pageGameData._id =
      updatedSessionData.sessionData[parseInt(pageNum - 1)]._id.toString();
  } else {
    pageGameData = playSessionData.sessionData[parseInt(pageNum) - 1];
  }

  //pixelating image
  const image = await pixelateImageFromURL(
    pageGameData.imgLink,
    playSessionData.difficulty
  );

  const responseData = JSON.stringify({
    gamesArray: pageGameData.gamesArray,
    pageGameDataId: pageGameData._id,
    userGuessText: pageGameData?.userGuessText || "",
    sessionLength,
    image,
  });
  res.json(responseData);
};

module.exports.renderPlay = async (req, res) => {
  const { id } = req.params;
  const playSessionData = await PlaySession.findOne({ sessionId: id });
  if (playSessionData.sessionEnded) {
    res.redirect("/results");
  }
  res.render("main/play.ejs", {
    extraStyles: cardStyle,
  });
};

module.exports.renderResults = async (req, res, next) => {
  const { id } = req.params;
  let playSessionData = await PlaySession.findOne({ sessionId: id });

  playSessionData = JSON.stringify(playSessionData);
  res.render("main/results", {
    extraStyles: resultsStyle + mediaButtonsStyle,
    playSessionData,
    sessionId: id,
  });
  next();
};

module.exports.fetchTopHighscores = async (req, res) => {
  const { difficulty, length } = req.query;
  const dbSearchFilter = `bestScores.${difficulty}.${length}`;
  const highscoresData = await getTop10Users(dbSearchFilter);
  const highscoreText = `${remapDifficultyTexts[difficulty]} ${length}`;
  const responseData = { highscoresData, highscoreText };
  res.json(JSON.stringify(responseData));
};

module.exports.renderDetailedResults = async (req, res, next) => {
  const { id } = req.params;
  const playSessionData = JSON.stringify(
    await PlaySession.findOne({ sessionId: id })
  );
  res.render("main/detailed-results", {
    extraStyles: detailedResultsStyle + mediaButtonsStyle,
    playSessionData,
  });
  next();
};

module.exports.sendPlayData = async (req, res, next) => {
  const id = uuidv4();
  const difficulty = parseInt(req.body.difficulty);
  const length = parseInt(req.body.sessionLength);
  dataSchemaValidation({ difficulty, length }, schemas.sendPlayDataSchema);
  if (
    !(difficulty in remapDifficultyTexts) ||
    !lengthSettingsOptions.includes(length)
  ) {
    res.redirect("/play-settings");
  } else {
    const playSession = new PlaySession({
      userId: req.user?._id || "guest",
      sessionId: id,
      difficulty,
      length,
      sessionData: [],
      sessionEnded: false,
      sessionStartTime: Date.now(),
    });
    await playSession.save();
    res.redirect(`/play/${id}/1`);
    next();
  }
};

module.exports.updatePlayData = async (req, res, next) => {
  const additionalData = JSON.parse(req.body.additionalData);
  req.body.additionalData = additionalData;
  const sessionId = additionalData.sessionId;
  dataSchemaValidation(req.body, schemas.updatePlayDataSchema);
  const thisSession = await PlaySession.findOne({ sessionId });
  //if session has already previously ended redirect to results page
  if (thisSession.sessionEnded) {
    res.redirect(`/results/${sessionId}`);
  }
  const pageNum = parseInt(additionalData.pageNum);
  const userGuess =
    req.body.guess === thisSession.sessionData[pageNum - 1].gameName;
  await PlaySession.updateOne(
    { sessionId },
    {
      $set: {
        "sessionData.$[elem].userGuess": userGuess,
        "sessionData.$[elem].userGuessText": req.body.guess,
      },
    },
    { arrayFilters: [{ "elem._id": req.body.elemId }] }
  );
  const thisUpdatedSession = await PlaySession.findOne({ sessionId });

  //if back button was pressed, go back a page in /play
  if (additionalData.action === "back") {
    res.redirect(`/play/${sessionId}/${pageNum - 1}`);
  }
  //if updating session data on last page, setting sessionEnded to true, calculating session score
  //and (if necessary) updating highscores and redirecting to results page
  if (thisUpdatedSession.length === parseInt(additionalData.pageNum)) {
    const userId = thisUpdatedSession.userId;
    const currentUser = await User.findOne({ _id: userId });
    const score = calculateScore(thisUpdatedSession, Date.now());
    await PlaySession.updateOne(
      { sessionId },
      { $set: { sessionEnded: true, sessionScore: score } }
    );
    if (
      currentUser.bestScores[thisSession.difficulty][thisSession.length] ===
        undefined ||
      currentUser.bestScores[thisSession.difficulty][thisSession.length] < score
    ) {
      await User.updateOne(
        { _id: userId },
        {
          $set: {
            [`bestScores.${thisSession.difficulty}.${thisSession.length}`]:
              score,
          },
        }
      );
    }
    res.redirect(`/results/${sessionId}`);
  }

  //redirecting to next guess page
  res.redirect(`/play/${sessionId}/${pageNum + 1}`);
  next();
};

module.exports.fetchDetailedGameData = async (req, res) => {
  const gameId = req.query.gameId;
  const requestedGameData = JSON.stringify(
    await GameData.findOne({ gameId: gameId })
  );
  res.json(requestedGameData);
};

module.exports.renderTest = async (req, res) => {
  res.render("main/test.ejs");
};
