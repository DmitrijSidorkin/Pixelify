let resultsHtml = "";
let correctAnswers = 0;
let guessStatus;

//going through all guesses (just 5 for now)
for (let i = 1; i <= 5; i++) {
  guessStatus = localStorage.getItem(i + ".userGuess");
  resultsHtml += `<div class=${guessStatus}>${localStorage.getItem(
    i + ".gameName"
  )}</div>`;

  //checking for guess status, counting correct guesses and changing the display stuff accordingly
  if (guessStatus === "correct") {
    correctAnswers++;
  }
  //if the majority of guesses are correct (just >2 for now)
  if (correctAnswers > 2) {
    document.getElementById("results-title").innerText = "Congratulations!!!";
    document.getElementById("results-image").src =
      "https://i.kym-cdn.com/photos/images/original/000/707/322/fac.gif";
  } else {
    document.getElementById("results-title").innerText = "OOF...";
    document.getElementById("results-image").src =
      "https://i.gifer.com/1T2p.gif";
  }
}

document.getElementById(
  "results-details"
).innerText = `You guessed ${correctAnswers} out of 5`;
document.getElementById("all-answers").innerHTML = resultsHtml;
