/* eslint-disable no-unused-vars */

function fetchSlideData(textHtml) {
  fetch(
    `/fetch-detailed-game-data?gameId=${
      playSessionData.sessionData[slideIndex - 1].gameId
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      data = JSON.parse(data);
      let stores = "";
      const formattedPlatforms = data.platforms.join(", ");
      const formattedGenres = data.genres.join(", ");
      const formattedDevs = data.developers.join(", ");
      let metaScoreClass = "";
      if (data.metaScore >= 75) {
        metaScoreClass = "meta-green";
      } else if (data.metaScore >= 50) {
        metaScoreClass = "meta-yellow";
      } else {
        metaScoreClass = "meta-red";
      }
      data.stores.forEach((store) => {
        stores += `<a href="${store.url}" target="_blank"><img class="store-icons" src="../../icons/store-icons/${store.store_id}.png"></a>`;
      });
      let htmlToAdd = `<div class="game-name user-guess-${
        playSessionData.sessionData[slideIndex - 1].userGuess
      }">${data.gameName}</div>
        <div class="meta-score-wrapper"><div class="meta-score ${metaScoreClass}">${
        data.metaScore
      }</div>
        <p class="meta-score-text">Metacritic score</p></div>
        <div class="game-details">
        <div class="game-game-details-text-wrapper">Genres:<p class="game-details-text">${formattedGenres}</p></div>
        <div class="game-game-details-text-wrapper">Developers:<p class="game-details-text">${formattedDevs}</p></div>
        <div class="game-game-details-text-wrapper">Platforms:<p class="game-details-text">${formattedPlatforms}</p>`;

      if (stores) {
        htmlToAdd += `<div class="game-game-details-text-wrapper">Stores:${stores}</div>`;
      }

      if (data.website) {
        htmlToAdd += `<div class="game-game-details-text-wrapper">Official Website:<a class="game-website" href="${data.website}" target="_blank">${data.website}</a></div>
        </div>`;
      }

      htmlToAdd += `<div class="page-num">${slideIndex}/${playSessionData.length}</div>`;
      textHtml.innerHTML = htmlToAdd;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  let text = document.getElementsByClassName("detailed-results-text");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  //check if slide text is empty, if so, fetch game data and fill the slide text
  if (!text[slideIndex - 1].innerHTML) {
    fetchSlideData(text[slideIndex - 1]);
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    text[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "flex";
  text[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].className += " active";
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Dots controlls
function currentSlide(n) {
  showSlides((slideIndex = n));
}
