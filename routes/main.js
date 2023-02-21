const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const passport = require("passport");
const main = require("../controllers/main");

router.route("/").get((req, res) => {
  res.render("home");
});

router.route("/play").get(main.renderPlay);

module.exports = router;
