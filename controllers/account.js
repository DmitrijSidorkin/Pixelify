const { cloudinary } = require("../cloudinary");

const { accountStyle } = require("../public/javascripts/extraStyles.js");
const {
  fetchProfileData,
  defaultProfileImg,
  getMaxDate,
} = require("../middleware/helpers.js");
const User = require("../models/user");
const { countries } = require("../public/javascripts/countries.js");

module.exports.renderAccountMain = async (req, res) => {
  const profileData = await fetchProfileData(req.user._id);
  res.render("account/account-main.ejs", {
    extraStyles: accountStyle,
    profileData,
    defaultProfileImg,
  });
};

module.exports.renderChangePassword = async (req, res) => {
  const profileData = await fetchProfileData(req.user._id);
  res.render("account/change-password.ejs", {
    extraStyles: accountStyle,
    profileData,
    defaultProfileImg,
  });
};

module.exports.renderChangeProfile = async (req, res) => {
  const profileData = await fetchProfileData(req.user._id);
  const maxDate = getMaxDate();
  res.render("account/change-profile.ejs", {
    extraStyles: accountStyle,
    profileData,
    defaultProfileImg,
    maxDate,
    countries,
  });
};

module.exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword, repeatPassword } = req.body;

  if (!oldPassword || !newPassword || !repeatPassword) {
    res.redirect("/account/change-password");
  }
  User.findById(req.user._id, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      if (newPassword === repeatPassword) {
        user.changePassword(oldPassword, newPassword, (err) => {
          if (err) {
            res.sendStatus(400);
          } else {
            res.sendStatus(200);
          }
        });
      }
    }
  });
};

module.exports.updateProfile = async (req, res) => {
  const profileData = {
    displayName: req.body.displayName,
    realName: req.body.realName,
    location: req.body.location,
    bio: req.body.bio,
  };

  const maxDate = getMaxDate();
  if (req.body.birthDate <= maxDate) {
    profileData.birthDate = req.body.birthDate;
  }
  if (countries.some((country) => country.value === req.body.country)) {
    profileData.country = req.body.country;
  }

  if (req.file) {
    const user = await User.findById(req.user._id);
    if (user.profileImg) {
      cloudinary.uploader.destroy(user.profileImg.filename);
    }
    profileData.profileImg = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  await User.findByIdAndUpdate(req.user._id, profileData);
  res.redirect("/account");
};
