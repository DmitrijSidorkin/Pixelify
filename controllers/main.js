const { getPixelatedImage } = require("../middleware");

const {
  cardStyle,
  resultsStyle,
} = require("../public/javascripts/extraStyles.js");

module.exports.renderPlaySettings = (req, res) => {
  res.render("./main/play-settings.ejs", {
    extraStyles: cardStyle,
    previewImage:
      "https://res.cloudinary.com/dyguovdbc/image/upload/v1676908287/pixelify/placeholder-image_ykgw2b.jpg",
  });
};

module.exports.renderPlay = async (req, res) => {
  const image = await getPixelatedImage(req.gameData.background_image);

  res.render("main/play.ejs", {
    image,
    gameName: req.gameData.name,
    imgLink: req.gameData.background_image,
    extraStyles: cardStyle,
  });
};

// module.exports.renderTest = async (req, res) => {
//   const image = await getPixelatedImage(req.gameData.background_image);

//   res.render("main/test.ejs", {
//     image,
//     gameName: req.gameData.name,
//     imgLink: req.gameData.background_image,
//     extraStyles: cardStyle,
//   });
// };

module.exports.renderResults = (req, res) => {
  res.render("main/results.ejs", {
    extraStyles: resultsStyle,
  });
};
