const userGuessData = JSON.parse(localStorage.getItem("userGuessData"));
let resultsHtml = "";
let correctAnswers = 0;

//going through all guesses (just 5 for now)
for (let i = 0; i < userGuessData.length; i++) {
  resultsHtml += `<div class=user-guess-${userGuessData[i].userGuess}>${userGuessData[i].gameName}</div>`;

  //checking for guess status, counting correct guesses and changing the display stuff accordingly
  if (userGuessData[i].userGuess) {
    correctAnswers++;
  }
}

//if the majority of guesses are correct (just >2 for now)
let resultsTitle = document.getElementById("results-title");
let resultsImage = document.getElementById("results-image");

if (correctAnswers > 2) {
  resultsTitle.innerText = "Congratulations!!!";
  resultsImage.src =
    "https://i.kym-cdn.com/photos/images/original/000/707/322/fac.gif";
} else {
  resultsTitle.innerText = "OOF...";
  resultsImage.src = "https://i.gifer.com/1T2p.gif";
}

document.getElementById(
  "results-details"
).innerText = `You guessed ${correctAnswers} out of ${userGuessData.length}`;
document.getElementById("all-answers").innerHTML = resultsHtml;
// localStorage.removeItem("userGuessData");
