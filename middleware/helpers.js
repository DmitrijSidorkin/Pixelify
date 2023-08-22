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
  return match && match[3];
}

module.exports.mediaLinkValidation = ({
  facebook,
  twitter,
  instagram,
  tumblr,
}) => {
  const facebookRegex =
    /^(https?:\/\/)?(www\.)?facebook\.com\/(?:[a-zA-Z0-9.]+\/)?(?:profile\.php\?id=(\d+)|([a-zA-Z0-9.]+))\/?$/;
  const twitterRegex =
    /^(https?:\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9_]{1,15})\/?$/;
  const instagramRegex =
    /^(https?:\/\/)?(www\.)?instagram\.com\/([a-zA-Z0-9_.]{1,30})\/?$/;
  const tumblrRegex =
    /^(https?:\/\/)?(www\.)?tumblr\.com\/([a-zA-Z0-9_.]{1,30})\/?$/;

  const validLinks = {};
  if (checkMediaLink(facebook, facebookRegex)) {
    validLinks.facebook = facebook;
  }
  if (checkMediaLink(twitter, twitterRegex)) {
    validLinks.twitter = twitter;
  }
  if (checkMediaLink(instagram, instagramRegex)) {
    validLinks.instagram = instagram;
  }
  if (checkMediaLink(tumblr, tumblrRegex)) {
    validLinks.tumblr = tumblr;
  }
  return validLinks;
};

module.exports.getTop10Users = async (dbSearchFilter) => {
  const pipeline = [
    { $sort: { [dbSearchFilter]: -1 } },
    { $limit: 10 },
    {
      $project: {
        _id: 1,
        username: 1,
        profileImage: 1,
        country: 1,
        profileImg: 1,
        score: `$${dbSearchFilter}`,
      },
    },
  ];
  const topUsers = await User.aggregate(pipeline);
  return topUsers;
};
