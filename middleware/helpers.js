const PlaySession = require("../models/session");
const User = require("../models/user");
// myCollection = "", myFilter = ""

const defaultProfileImg = "../../images/default-pfp.png";

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

function checkMediaLink(mediaLink, linkRegex) {
  const match = mediaLink.match(linkRegex);
  console.log(match && match[3]);
  return match && match[3];
}

module.exports.mediaLinkValidation = (facebook, twitter, instagram, tumblr) => {
  const mediaRegex = {
    facebook:
      /^(https?:\/\/)?(www\.)?facebook\.com\/(?:[a-zA-Z0-9.]+\/)?(?:profile\.php\?id=(\d+)|([a-zA-Z0-9.]+))\/?$/,
    twitter: /^(https?:\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9_]{1,15})\/?$/,
    instagram:
      /^(https?:\/\/)?(www\.)?instagram\.com\/([a-zA-Z0-9_.]{1,30})\/?$/,
    tumblr: /^(https?:\/\/)?(www\.)?tumblr\.com\/([a-zA-Z0-9_.]{1,30})\/?$/,
  };
  let validLinks = {};
  if (checkMediaLink(facebook, mediaRegex.facebook)) {
    validLinks.facebook = facebook;
  }
  if (checkMediaLink(twitter, mediaRegex.twitter)) {
    validLinks.twitter = twitter;
  }
  if (checkMediaLink(instagram, mediaRegex.instagram)) {
    validLinks.instagram = instagram;
  }
  if (checkMediaLink(tumblr, mediaRegex.tumblr)) {
    validLinks.tumblr = tumblr;
  }
  return validLinks;
};

//matchIndex is necessary because tumblr links have a different structure
