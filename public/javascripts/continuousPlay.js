/* eslint-disable no-unused-vars */

const pageNum = parseInt(document.getElementById("pageNum").value);
console.log(pageNum);
if (pageNum === 1) {
  console.log(document.getElementById("button-back"));
  document.getElementById("button-back").style.visibility = "hidden";
}
//placeholder
function prevGuess() {
  console.log("hello world!");
}
