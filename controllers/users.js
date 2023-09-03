const User = require("../models/user");
const { pixelateImageFromURL } = require("../middleware/imagePixelation");
const { ROUTES } = require("./routes");

const { cardStyle } = require("../public/javascripts/extraStyles.js");
const { dataSchemaValidation } = require("../middleware");
const { registrationSchema } = require("../schemas");

module.exports.renderRegister = async (req, res) => {
  const image = await pixelateImageFromURL(req.gameData.background_image);
  res.render("users/register.ejs", { image, extraStyles: cardStyle });
};

module.exports.register = async (req, res, next) => {
  if (dataSchemaValidation(req.body, registrationSchema)) {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome!");
        res.redirect(ROUTES.index);
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect(ROUTES.register);
    }
  } else {
    res.redirect("/register");
  }
};

module.exports.renderLogin = async (req, res) => {
  const image = await pixelateImageFromURL(req.gameData.background_image);
  res.render("users/login", { image, extraStyles: cardStyle });
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect(ROUTES.index);
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out!");
    res.redirect(ROUTES.index);
  });
};
