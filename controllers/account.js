const { accountStyle } = require("../public/javascripts/extraStyles.js");
const { fetchProfileData } = require("../middleware/helpers.js");

module.exports.renderAccountMain = async (req, res) => {
  const profileData = await fetchProfileData(req.user._id);
  res.render("account/account-main.ejs", {
    extraStyles: accountStyle,
    username: profileData.username,
  });
};

module.exports.renderChangeProfile = async (req, res) => {
  const profileData = await fetchProfileData(req.user._id);
  res.render("account/change-profile.ejs", {
    extraStyles: accountStyle,
    username: profileData.username,
  });
};
