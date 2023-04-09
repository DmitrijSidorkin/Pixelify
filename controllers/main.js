const { getPixelatedImage } = require("../middleware");

const { cardStyle } = require("../public/javascripts/extraStyles.js");

module.exports.renderPlay = async (req, res, next) => {
  const image = await getPixelatedImage(req.gameData.background_image);
  res.render("main/play.ejs", {
    image,
    gameName: req.gameData.name,
    extraStyles: cardStyle,
  });
};
