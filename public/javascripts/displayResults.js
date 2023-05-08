const userGuessData = JSON.parse(document.getElementById("results-data").value);
let resultsHtml = "<ul>";
let correctAnswers = 0;
console.log(userGuessData);
//going through all guesses (just 5 for now)
for (let i = 0; i < userGuessData.length; i++) {
  resultsHtml += `<li class=user-guess-${userGuessData.sessionData[i].userGuess}>${userGuessData.sessionData[i].gameName}</li>`;

  //checking for guess status, counting correct guesses and changing the display stuff accordingly
  if (userGuessData.sessionData[i].userGuess) {
    correctAnswers++;
  }
}
resultsHtml += "</ul>";

//if the majority of guesses are correct (just >2 for now)
let resultsTitle = document.getElementById("results-title");
let resultsImage = document.getElementById("results-image");

if (correctAnswers > Math.floor(userGuessData.length / 2)) {
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
localStorage.removeItem("userGuessData");
