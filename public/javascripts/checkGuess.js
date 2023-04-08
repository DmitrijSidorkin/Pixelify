function checkGuess() {
  var hide = document.getElementById("guess-div");
  hide.style.display = "none";
  var result = document.getElementById("result-div");
  result.style.display = "block";

  var nigger1 = document.getElementById("guess").value;
  const nigger2 = document.getElementById("gameName").innerHTML;
  console.log(nigger1);
  console.log(nigger2);
  if (nigger1 == nigger2) {
    document.getElementById("feedback").innerHTML = "Congratulations!";
  } else {
    document.getElementById("feedback").innerHTML = "Now you fucked up!";
  }
}
