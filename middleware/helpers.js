const PlaySession = require("../models/session");
const User = require("../models/user");

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

function removeQueryParamsFromUrl(url) {
  if (url.includes("facebook.com")) {
    // Split the URL into base and query parts
    const [baseUrl, queryParams] = url.split("?");

    // If "id" query parameter exists, reconstruct the URL
    const idMatch = queryParams.match(/(?:^|&)id=(\d+)/);
    if (idMatch) {
      const facebookId = idMatch[1];
      return `${baseUrl}?id=${facebookId}`;
    }
  }

  const urlWithoutQuery = url.split("?")[0];
  return urlWithoutQuery;
}

function filterMediaLink(mediaLinks, linkRegex) {
  const validLinks = {};
  Object.entries(mediaLinks).forEach(([key, link]) => {
    const match = link.match(linkRegex[key]);
    if (match && match[3]) {
      validLinks[key] = removeQueryParamsFromUrl(link);
    }
  });
  return validLinks;
}

module.exports.mediaLinkValidation = (userMediaLinks) => {
  const mediaRegex = {
    facebook:
      /^(https?:\/\/)?(www\.)?facebook\.com\/(?:[a-zA-Z0-9.]+\/)?(?:profile\.php\?id=(\d+)|([a-zA-Z0-9.]+))\/?(?:\?.*)?$/,
    twitter:
      /^(https?:\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9_]{1,15})\/?(?:\?.*)?$/,
    instagram:
      /^(https?:\/\/)?(www\.)?instagram\.com\/([a-zA-Z0-9_.]{1,30})\/?(?:\?.*)?$/,
    tumblr:
      /^(https?:\/\/)?(www\.)?tumblr\.com\/([a-zA-Z0-9_.]{1,30})\/?(?:\?.*)?$/,
  };

  return filterMediaLink(userMediaLinks, mediaRegex);
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
