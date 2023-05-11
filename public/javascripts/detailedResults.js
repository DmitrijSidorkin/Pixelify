const playSessionData = JSON.parse(
  document.getElementById("results-data").value
);
console.log(playSessionData);
let slides = "";

for (let i = 0; i < playSessionData.length; i++) {
  slides += `<div class="mySlides fade"><div class="numbertext">${i + 1} / ${
    playSessionData.length
  }</div><img class="img=detailed" src="${
    playSessionData.sessionData[i].imgLink
  }"/><div class="text">${playSessionData.sessionData[i].gameName}</div></div>`;
}

document.getElementById("slideshow-container").innerHTML =
  slides + document.getElementById("slideshow-container").innerHTML;
