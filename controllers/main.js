const { getPixelatedImage } = require("../middleware");

const style = require("../public/javascripts/extraStyles.js");

module.exports.renderPlay = async (req, res, next) => {
  const image = await getPixelatedImage(req.gameData.background_image);
  const extraStyles = style.cardStyle;
  res.render("main/play.ejs", { image, extraStyles });
};
