const playSessionData = JSON.parse(
  document.getElementById("results-data").value
);

//image slides for each game (initiated and finished up with buttons)
let slides = `<div class="button-wrapper prev" onclick="plusSlides(-1)">&#10094;</div>`;
//dots for another option to scroll through slides, only present if there are fewer than 20 slides
let dots = "";
//details for each game
let gameInfo = "";
//generating image slides and game info for each entry
playSessionData.sessionData.forEach((game, index) => {
  slides += `<div class="mySlides fade"><img class="img-detailed" src="${
    game.imgLink
  }" alt="unpixelated-game-${index + 1}"/></div>`;
  gameInfo += `<div class="detailed-results-text"></div>`;
});

//if there are 20 slides of fewer generating the navigational dots
if (playSessionData.length <= 20) {
  playSessionData.sessionData.forEach((a, index) => {
    dots += `<span class="dot" onclick="currentSlide(${index + 1})"></span>`;
  });
}
//adding the 2nd navigational button for slides
slides += `<div class="button-wrapper next" onclick="plusSlides(1)" style="right:0">&#10095;</div>`;

document.getElementById("slideshow-container").innerHTML = slides;
document.getElementById("dots-container").innerHTML = dots;
document.getElementById("game-info-container").innerHTML = gameInfo;
