const { cloudinary } = require("../cloudinary");

const { accountStyle } = require("../public/javascripts/extraStyles.js");
const {
  fetchProfileData,
  defaultProfileImg,
} = require("../middleware/helpers.js");
const User = require("../models/user");

module.exports.renderAccountMain = async (req, res) => {
  const profileData = await fetchProfileData(req.user._id);
  res.render("account/account-main.ejs", {
    extraStyles: accountStyle,
    profileData,
    defaultProfileImg,
  });
};

module.exports.renderChangeProfile = async (req, res) => {
  const profileData = await fetchProfileData(req.user._id);
  res.render("account/change-profile.ejs", {
    extraStyles: accountStyle,
    profileData,
    defaultProfileImg,
  });
};

module.exports.updateProfile = async (req, res) => {
  const profileData = {
    displayName: req.body.displayName,
    realName: req.body.realName,
    birthDate: req.body.birthDate,
    country: req.body.country,
    location: req.body.location,
    bio: req.body.bio,
  };

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
