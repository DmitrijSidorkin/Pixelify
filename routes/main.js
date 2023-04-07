const express = require("express");
const router = express.Router();

const main = require("../controllers/main");
const { fetchRandomGameData } = require("../middleware");
const { ROUTES } = require("../controllers/routes");
const { mainStyle, cardStyle } = require("../public/javascripts/extraStyles");

router.route(ROUTES.index).get((req, res) => {
  res.render("home", { extraStyles: mainStyle });
});

router.route(ROUTES.error).get((req, res) => {
  res.render("error", { extraStyles: cardStyle, error: req.session.error });
});

router.route(ROUTES.play).get(fetchRandomGameData, main.renderPlay);

module.exports = router;
