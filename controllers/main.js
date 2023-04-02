const { getPixelatedImage } = require("../middleware");

module.exports.renderPlay = async (req, res, next) => {
  const image = await getPixelatedImage(req.gameData.background_image);
  const extraStyles = '<link rel="stylesheet" href="/stylesheets/cards.css" />';
  res.render("main/play.ejs", { image, extraStyles });
};
