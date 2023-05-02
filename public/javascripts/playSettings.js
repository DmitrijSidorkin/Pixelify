/* eslint-disable no-unused-vars */

let chosenDifficulty;
let chosenLength;
let sessionSettings = {};

function chooseDifficulty(radio) {
  chosenDifficulty = radio.value;
}

function chooseLength(radio) {
  chosenLength = radio.value;
}

function start() {
  if (chosenDifficulty && chosenLength) {
    sessionSettings.playSessionId =
      document.getElementById("sessionId").innerText;
    sessionSettings.difficulty = chosenDifficulty;
    sessionSettings.sessionLength = chosenLength;
    localStorage.setItem("sessionSettings", JSON.stringify(sessionSettings));
  }
}
