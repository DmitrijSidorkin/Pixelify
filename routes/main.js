const express = require("express");

const router = express.Router();

const main = require("../controllers/main");
const { ROUTES } = require("../controllers/routes");
const { mainStyle } = require("../public/javascripts/extraStyles");

router.route(ROUTES.index).get((req, res) => {
  res.render("home", { extraStyles: mainStyle });
});

router.route(ROUTES.error).get((req, res) => {
  res.render("error", { error: req.session.error });
});

router.route(ROUTES.playSettings).get(main.renderPlaySettings);
router.route(ROUTES.play).get(main.renderPlay);
router.route(ROUTES.fetchPlayGameData).get(main.fetchPlayGameData);
router.route(ROUTES.playOrContinue).get(main.playOrContinue);
router.route(ROUTES.continue).get(main.renderContinue);

router.route(ROUTES.results).get(main.renderResults);
router.route(ROUTES.fetchTopHighscores).get(main.fetchTopHighscores);
router.route(ROUTES.detailedResults).get(main.renderDetailedResults);
router.route(ROUTES.fetchDetailedGameData).get(main.fetchDetailedGameData);

router.route(ROUTES.sendPlayData).post(main.sendPlayData);
router.route(ROUTES.updatePlayData).post(main.updatePlayData);

module.exports = router;
