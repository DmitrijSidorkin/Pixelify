const express = require("express");
const router = express.Router();

const main = require("../controllers/main");
const { fetchRandomGameData } = require("../middleware");
const { ROUTES } = require("../controllers/routes");
const style = require("../public/javascripts/extraStyles");

router.route(ROUTES.index).get((req, res) => {
  const extraStyles = style.mainStyle;
  res.render("home", { extraStyles });
});

router.route(ROUTES.error).get((req, res) => {
  const extraStyles = style.cardStyle;
  res.render("error", { extraStyles, error: req.session.error });
});

router.route(ROUTES.play).get(fetchRandomGameData, main.renderPlay);

module.exports = router;
