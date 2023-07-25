function fetchUserHighScores() {
  fetch(`fetch-user-highscores`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let htmlRows = "";
      data.lengthSettingsOptions.forEach((setting) => {
        htmlRows += `<div class="grid-length">${setting}</div>`;
        Object.keys(data.highscores).forEach((difficulty) => {
          if (!data.highscores[difficulty][setting]) {
            htmlRows += `<div class="grid-score">0</div>`;
          } else {
            htmlRows += `<div class="grid-score">${data.highscores[difficulty][setting]}</div>`;
          }
        });
      });
      document.querySelector(".grid-container").innerHTML += htmlRows;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

fetchUserHighScores();
