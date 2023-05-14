const PlaySession = require("../models/session");
const User = require("../models/user");
// myCollection = "", myFilter = ""

module.exports.fetchPlaySessionData = async (currentUser) => {
  const gameSession = await PlaySession.findOne({ userId: currentUser }).sort({
    $natural: -1,
  });
  return gameSession;
};
module.exports.fetchProfileData = async (currentUser) => {
  return await User.findById(currentUser);
};

module.exports.generateUniqueRandomArr = () => {
  let numArr = [];
  while (numArr.length < 5) {
    let randomNum = Math.floor(Math.random() * 168 + 1);
    if (!numArr.includes(randomNum)) {
      numArr.push(randomNum);
    }
  }
  return numArr;
};
