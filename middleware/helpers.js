const PlaySession = require("../models/session");
const User = require("../models/user");
// myCollection = "", myFilter = ""

const defaultProfileImg =
  "https://res.cloudinary.com/dyguovdbc/image/upload/w_400/v1680099865/pixelify/PixelatedVergil_rl9cpv.jpg";

module.exports.defaultProfileImg;

module.exports.fetchPlaySessionData = async (currentUser) => {
  return await PlaySession.findOne({ userId: currentUser }).sort({
    $natural: -1,
  });
};
module.exports.fetchProfileData = async (currentUser) => {
  const profileData = await User.findById(currentUser);
  if (profileData.profileImg) {
    return profileData;
  } else {
    profileData.profileImg = { url: defaultProfileImg };
  }
  return profileData;
};

module.exports.generateUniqueRandomArr = (maxNum, arrSize) => {
  let numArr = [];
  while (numArr.length < arrSize) {
    let randomNum = Math.floor(Math.random() * maxNum);
    if (!numArr.includes(randomNum)) {
      numArr.push(randomNum);
    }
  }
  return numArr;
};
module.exports.generateRandomNum = (maxNum) => {
  return Math.floor(Math.random() * maxNum + 1);
};

module.exports.calculatePixelationDegree = (minDimension, difficulty) => {
  const targetPixels = 120 - 20 * difficulty;
  return Math.floor(minDimension / targetPixels + 1);
};

module.exports.getMaxDate = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear() - 3;
  const day = currentDate.getDate();
  let month = "";

  if (currentDate.getMonth() < 9) {
    month = "0" + (currentDate.getMonth() + 1);
  } else {
    month = currentDate.getMonth() + 1;
  }

  return `${year}-${month}-${day}`;
};
