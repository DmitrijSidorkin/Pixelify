/* eslint-disable no-unused-vars */

//page numeration
let pageNum = parseInt(localStorage.getItem("pageNum"));
let pageCounter = document.getElementById("page-counter");
let nextButtonText = document.getElementById("button-next");
let userGuessData = JSON.parse(localStorage.getItem("userGuessData")) || {};

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
  const guesses = document.querySelectorAll('input[name="guess"]');
  const gameName = document.getElementById("game-name").innerText;
  const imgLink = document.getElementById("img-link").innerText;

  //saving currect guess data
  userGuessData[`gameName${pageNum}`] = gameName;
  userGuessData[`imgLink${pageNum}`] = imgLink;

  //checking for user guess and saving guess status (correct/wrong)
  let thereIsCheckedGuess = 0;
  for (const guess of guesses) {
    if (guess.checked) {
      thereIsCheckedGuess++;
      guess.value === gameName
        ? (userGuessData[`userGuess${pageNum}`] = "correct")
        : (userGuessData[`userGuess${pageNum}`] = "wrong");
    }
  }
  if (!thereIsCheckedGuess) {
    userGuessData[`userGuess${pageNum}`] = "wrong";
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
  localStorage.setItem("userGuessData", JSON.stringify(userGuessData));
}

//placeholder
function prevGuess() {
  console.log("hello world!");
}
