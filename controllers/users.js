const Jimp = require("jimp");

const User = require("../models/user");

const getPixelatedImage = async (image) => {
  const originalImage = await Jimp.read(image);
  const pixelatedImage = await originalImage
    .pixelate(10)
    .getBase64Async(Jimp.MIME_JPEG);
  res.render("users/register.ejs", { image });
  return pixelatedImage;
};

module.exports.renderRegister = async (req, res, next) => {
  const image = await getPixelatedImage(req.gameData.background_image);
  res.render("users/register.ejs", { image });
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome!");
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

module.exports.renderLogin = async (req, res, next) => {
  const image = await getPixelatedImage(req.gameData.background_image);
  res.render("users/login", { image });
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect(localStorage.getItem("redirectUrl"));
  localStorage.removeItem("redirectUrl");
};

module.exports.renderAccount = (req, res) => {
  res.render("users/account.ejs");
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out!");
    res.redirect("/");
  });
};
