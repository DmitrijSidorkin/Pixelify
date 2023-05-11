/* eslint-disable no-unused-vars */

const userGuessData = JSON.parse(document.getElementById("results-data").value);
let resultsHtml = "<ul>";
let correctAnswers = 0;

//going through all guesses; counting correct guesses
for (let i = 0; i < userGuessData.length; i++) {
  resultsHtml += `<li class=user-guess-${userGuessData.sessionData[i].userGuess}>${userGuessData.sessionData[i].gameName}</li>`;

  if (userGuessData.sessionData[i].userGuess) {
    correctAnswers++;
  }
}
resultsHtml += "</ul>";

let resultsTitle = document.getElementById("results-title");
let resultsImage = document.getElementById("results-image");

//checking if the majority of guesses are correct
if (correctAnswers > Math.floor(userGuessData.length / 2)) {
  resultsTitle.innerText = "Congratulations!!!";
  resultsImage.src =
    "https://i.kym-cdn.com/photos/images/original/000/707/322/fac.gif";
} else {
  resultsTitle.innerText = "OOF...";
  resultsImage.src = "https://i.gifer.com/1T2p.gif";
}

//printing response depending on results
document.getElementById(
  "results-details"
).innerText = `You guessed ${correctAnswers} out of ${userGuessData.length}`;
document.getElementById("all-answers").innerHTML = resultsHtml;
localStorage.removeItem("userGuessData");

//redirecting to detailed results of the session
function detailedResults() {
  window.location = `/detailed-results/${userGuessData.sessionId}`;
}
