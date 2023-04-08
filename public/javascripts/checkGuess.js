function checkGuess() {
  var hide = document.getElementById("guess-div");
  hide.style.display = "none";
  var result = document.getElementById("result-div");
  result.style.display = "block";

  if (
    document.getElementById("guess").value ==
    document.getElementById("gameName").innerHTML
  ) {
    document.getElementById("feedback").innerHTML = "Congratulations!";
  } else {
    document.getElementById("feedback").innerHTML = "Now you fucked up!";
  }
}
