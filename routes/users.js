const express = require("express");
const router = express.Router();
const passport = require("passport");

const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const { fetchRandomGameData } = require("../middleware");
const { ROUTES } = require("../controllers/routes");
const { Route } = require("express");

router
  .route(ROUTES.register)
  .get(fetchRandomGameData, users.renderRegister)
  .post(catchAsync(users.register));

router
  .route(ROUTES.login)
  .get(fetchRandomGameData, users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: ROUTES.login,
      successRedirect: ROUTES.index,
    }),
    users.login
  );

router.get(ROUTES.logout, users.logout);

module.exports = router;
