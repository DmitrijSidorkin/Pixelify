const Jimp = require("jimp");
const axios = require("axios");

const ExpressError = require("./utils/ExpressError");
const { reviewSchema } = require("./schemas.js");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }
  next();
};

// module.exports.isAuthor = async (req, res, next) => {
//   const { id } = req.params;
//   const campground = await Campground.findById(id);
//   if (!campground.author.equals(req.user._id)) {
//     req.flash("error", "You do not have permission to do that");
//     return res.redirect(`/campgrounds/${id}`);
//   }
//   next();
// };

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.fetchRandomGameData = async (req, res, next) => {
  const randGameId = Math.floor(Math.random() * 1000 + 1);
  const results = await axios.get(
    `https://api.rawg.io/api/games/${randGameId}?key=42d3994083024d64aebad13f6568556c`
  );
  console.log(results);
  req.gameData = results.data;

  next();
};

module.exports.getPixelatedImage = async (image) => {
  const originalImage = await Jimp.read(image);
  const pixelatedImage = await originalImage
    .pixelate(10)
    .getBase64Async(Jimp.MIME_JPEG);
  return pixelatedImage;
};
