/* eslint-disable no-unused-vars */

//page numeration
let pageNum = parseInt(localStorage.getItem("pageNum"));
let pageCounter = document.getElementById("page-counter");
let nextButtonText = document.getElementById("button-next");
let allUserGuessData = JSON.parse(localStorage.getItem("userGuessData")) || [];

if (pageNum) {
  pageCounter.innerText = `${pageNum} of 5`;
} else {
  pageCounter.innerText = "1 of 5";
  localStorage.setItem("pageNum", "1");
  pageNum = 1;
}
if (pageNum === 5) {
  nextButtonText.innerText = "Finish";
}

//on clicking next
function nextGuess() {
  const userGuess = document.querySelector('input[name="guess"]:checked');
  const gameName = document.getElementById("game-name").innerText;
  const imgLink = document.getElementById("img-link").innerText;
  let userGuessStatus;

  //checking for user guess and saving guess status (correct/wrong)
  if (userGuess) {
    userGuessStatus = userGuess.value === gameName;
  } else {
    userGuessStatus = false;
  }
  console.log(allUserGuessData[8]);
  //saving current guess data
  if (allUserGuessData[pageNum - 1]) {
    allUserGuessData[pageNum - 1] = userGuessStatus;
  } else {
    allUserGuessData.push({
      gameName: gameName,
      imgLink: imgLink,
      userGuess: userGuessStatus,
    });
  }

  //checking for whether this is the last guess or not and redirecting accordingly
  if (pageNum === 5) {
    //results upload functionality (maybe)
    localStorage.removeItem("pageNum");
    location.href = "/results";
  } else {
    localStorage.setItem("pageNum", pageNum + 1);
    location.href = "/play";
  }
  localStorage.setItem("userGuessData", JSON.stringify(allUserGuessData));
}

//placeholder
function prevGuess() {
  console.log("hello world!");
}
