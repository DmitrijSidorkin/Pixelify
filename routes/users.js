const express = require("express");
const router = express.Router();
const passport = require("passport");

const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const { fetchRandomGameData } = require("../middleware");

router
  .route("/register")
  .get(fetchRandomGameData, users.renderRegister)
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(fetchRandomGameData, users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
      successRedirect: "/",
    }),
    users.login
  );

router.get("/logout", users.logout);

module.exports = router;
