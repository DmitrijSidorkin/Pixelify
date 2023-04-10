function checkGuess(gameName) {
  const hide = document.getElementById("guess-div");
  const result = document.getElementById("result-div");
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

module.exports = {
  checkGuess,
};
