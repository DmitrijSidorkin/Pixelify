const express = require("express");
const router = express.Router();

const main = require("../controllers/main");
const { fetchRandomGameData } = require("../middleware");
const { ROUTES } = require("../controllers/routes");

router.route(ROUTES.index).get((req, res) => {
  const extraStyles = '<link rel="stylesheet" href="/stylesheets/main.css" />';
  res.render("home", { extraStyles });
});

router.route(ROUTES.play).get(fetchRandomGameData, main.renderPlay);

module.exports = router;
