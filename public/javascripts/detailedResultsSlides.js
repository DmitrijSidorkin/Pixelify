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
      let metaScoreStyle = "";
      if (data.metaScore >= 75) {
        metaScoreStyle = "meta-green";
      } else if (data.metaScore >= 50) {
        metaScoreStyle = "meta-yellow";
      } else {
        metaScoreStyle = "meta-red";
      }
      data.stores.forEach((store) => {
        stores += `<a href="${store.url}"><img class="store-icons" src="../../icons/store-icons/${store.store_id}.png"></a>`;
      });
      textHtml.innerHTML = `<div class="game-name user-guess-${playSessionData.sessionData.userGuess}">${data.gameName}</div>
        <div class="meta-score-wrapper"><div class="meta-score ${metaScoreStyle}">${data.metaScore}</div>
        <p class="meta-score-text">Metacritic score</p></div>
        <div class="game-details">
        <div class="game-details-item">Genres:<p class="details-text">${data.genres}</p></div>
        <div class="game-details-item">Developers:<p class="details-text">${data.developers}</p></div>
        <div class="game-details-item">Platforms:<p class="details-text">${data.platforms}</p></div>
        <div class="game-details-item">Stores:${stores}</div>
        <div class="game-details-item">Official Website:<a class="game-website" href="${data.website}">${data.website}</a></div>
        </div>
          <div class="page-num">${slideIndex}/${playSessionData.length}</div>`;
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
