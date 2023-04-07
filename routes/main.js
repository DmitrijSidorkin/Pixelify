const express = require("express");
const router = express.Router();

const main = require("../controllers/main");
const { fetchRandomGameData } = require("../middleware");
const { ROUTES } = require("../controllers/routes");
const { mainStyle, cardStyle } = require("../public/javascripts/extraStyles");

router.route(ROUTES.index).get((req, res) => {
  const extraStyles = mainStyle;
  res.render("home", { extraStyles });
});

router.route(ROUTES.error).get((req, res) => {
  const extraStyles = cardStyle;
  res.render("error", { extraStyles, error: req.session.error });
});

router.route(ROUTES.play).get(fetchRandomGameData, main.renderPlay);

module.exports = router;
