const { accountStyle } = require("../public/javascripts/extraStyles.js");

module.exports.renderAccountMain = (req, res) => {
  res.render("account/account-main.ejs", {
    extraStyles: accountStyle,
    username: req.user.username,
  });
};
