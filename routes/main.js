const express = require("express");
const router = express.Router();
const passport = require("passport");

const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const main = require("../controllers/main");

router.route("/").get((req, res) => {
  const extraStyles = '<link rel="stylesheet" href="/stylesheets/main.css" />';
  res.render("home", { extraStyles });
});

router.route("/play").get(main.renderPlay);

module.exports = router;
