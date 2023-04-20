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
