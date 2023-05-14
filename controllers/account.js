const { accountStyle } = require("../public/javascripts/extraStyles.js");
const { fetchProfileData } = require("../middleware/helpers.js");
const User = require("../models/user");

module.exports.renderAccountMain = async (req, res) => {
  const profileData = await fetchProfileData(req.user._id);
  res.render("account/account-main.ejs", {
    extraStyles: accountStyle,
    displayName: profileData.displayName,
  });
};

module.exports.renderChangeProfile = async (req, res) => {
  const profileData = await fetchProfileData(req.user._id);
  res.render("account/change-profile.ejs", {
    extraStyles: accountStyle,
    displayName: profileData.displayName,
  });
};
module.exports.updateProfile = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    displayName: req.body.displayName,
    profileImg: req.body.profileImg,
    realName: req.body.realName,
    birthDate: req.body.birthDate,
    country: req.body.country,
    location: req.body.location,
    bio: req.body.bio,
  });
  res.redirect("/account");
};
