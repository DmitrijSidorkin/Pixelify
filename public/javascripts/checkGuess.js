/* eslint-disable no-unused-vars */
function checkGuess(gameName) {
  const hide = document.getElementById("guess-wrapper");
  const result = document.getElementById("result-wrapper");
  const guessValue = document.getElementById("guess").value;
  const feedback = document.getElementById("feedback");

  hide.style.display = "none";
  result.style.display = "block";

  if (guessValue === gameName.innerText) {
    feedback.innerHTML = "Congratulations!";
  } else {
    feedback.innerHTML = "Now you fucked up!";
  }
}
