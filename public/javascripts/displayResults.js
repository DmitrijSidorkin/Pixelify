/* eslint-disable no-unused-vars */

const userGuessData = JSON.parse(document.getElementById("results-data").value);
let resultsHtml = '<ol class="guesses-list">';
let correctAnswers = 0;

//going through all guesses; counting correct guesses
for (let i = 0; i < userGuessData.length; i++) {
  resultsHtml += `<li class=user-guess-${userGuessData.sessionData[i].userGuess}>${userGuessData.sessionData[i].gameName}</li>`;

  if (userGuessData.sessionData[i].userGuess) {
    correctAnswers++;
  }
}
resultsHtml += "</ol>";

let resultsTitle = document.getElementById("results-title");
let resultsImage = document.getElementById("results-image");

//checking if the majority of guesses are correct
if (correctAnswers > Math.floor(userGuessData.length / 2)) {
  resultsTitle.innerText = "Congratulations!!!";
  resultsImage.src =
    "https://i.kym-cdn.com/photos/images/original/000/707/322/fac.gif";
} else {
  resultsTitle.innerText = "OOF...";
  resultsImage.src =
    "https://res.cloudinary.com/dyguovdbc/image/upload/v1686922995/pixelify/1T2p_y30bdx.gif";
}

//printing response depending on results
document.getElementById(
  "results-details"
).innerText = `You guessed ${correctAnswers} out of ${
  userGuessData.length
} (${Math.floor((correctAnswers / userGuessData.length) * 100)}%)`;
document.getElementById("all-answers").innerHTML = resultsHtml;

//redirecting to detailed results of the session
function detailedResults() {
  window.location = `/detailed-results/${userGuessData.sessionId}`;
}

//generating highscores html
const highscoresData = JSON.parse(
  document.getElementById("highscores-data").value
);
const defaultProfileImg = document.getElementById("default-profile-img").value;
let highscoreHtml = "";

highscoresData.forEach((highscore, index) => {
  highscoreHtml += `<div class="score">
  <h4 class="player-place">${index + 1}</h4>
  <a class="highscores-wrapper" href="/view-profile/${
    highscoresData[index]._id
  }"><img class="score-pfp" src="${
    highscore.profileImg?.url || defaultProfileImg
  }">
  <p class="player-name">${highscore?.displayName || highscore.username}</p></a>
  <p class="player-score">${highscore.bestScores[userGuessData.difficulty]}</p>
</div>`;
});

function switchTab(tab) {
  const resultsTab = document.getElementById("results-box");
  const highscoresTab = document.getElementById("highscores-box");
  if (tab.id === "current-results-tab") {
    resultsTab.style.display = "flex";
    highscoresTab.style.display = "none";
  }
  if (tab.id === "highscores-tab") {
    highscoresTab.style.display = "block";
    resultsTab.style.display = "none";
  }
}

document.getElementById("highscores").innerHTML = highscoreHtml;
