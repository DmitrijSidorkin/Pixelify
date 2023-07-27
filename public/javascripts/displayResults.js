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
).innerHTML = `You guessed <p class="highlighted-text">${correctAnswers}</p> out of <p class="highlighted-text">${
  userGuessData.length
} (${Math.floor((correctAnswers / userGuessData.length) * 100)}%)</p><br>
Your Score: <p class="highlighted-text">${userGuessData.sessionScore}</p>`;

document.getElementById("all-answers").innerHTML = resultsHtml;

//redirecting to detailed results of the session
function detailedResults() {
  window.location = `/detailed-results/${userGuessData.sessionId}`;
}

function fetchAndGenerateHighscores() {
  fetch(
    `/fetch-top-highscores?difficulty=${userGuessData.difficulty}&length=${userGuessData.length}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      data = JSON.parse(data);
      console.log(data);
      let highscoreHtml = `<div class="highscores-title">${data.highscoreText}</div><div id="highscores">`;
      data.highscoresData.forEach((highscore, index) => {
        highscoreHtml += `<div class="score" id="highscore-${index + 1}">
        <h4 class="player-place">${index + 1}</h4>
        <img class="score-pfp" src="${
          highscore.profileImg?.url || "../../images/default-pfp.png"
        }">
        <p class="player-name">${
          highscore?.displayName || highscore.username
        }</p>
        <p class="player-score">${highscore.score}</p>
      </div>`;
      });
      highscoreHtml += "</div>";
      document.getElementById("highscores-box").innerHTML = highscoreHtml;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
fetchAndGenerateHighscores();

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
