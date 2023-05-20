const pageNum = parseInt(document.getElementById("pageNum").value);

if (pageNum === 1) {
  document.getElementById("button-back").style.visibility = "hidden";
}

// const gameGuessArray = document.getElementById("gamesArray").value;
// let gameGuessHtml = "";
// gameGuessArray.forEach((gameName, index) => {
//   gameGuessHtml += `<div><input class="field-input" type="radio" id="guess-${index}" name="guess" value="${gameName}"/><label for="guess-${index}">${gameName}</label></div>`;
// });

// document.getElementById("gameGuesses").innerHTML = gameGuessHtml;
