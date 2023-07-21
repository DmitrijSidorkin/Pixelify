function fetchUserHighScores() {
  fetch(`fetch-user-highscores`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let htmlRows = [];
      data.lengthSettingsOptions.forEach((setting, index) => {
        htmlRows[index] = `<div class="grid-length">${setting}</div>`;
      });
      console.log(Object.keys(data.highscores).length);
      for (let i = 0; i < Object.keys(data.highscores).length; i++) {
        console.log(data.highscores.length);
        for (let j = 0; j < data.lengthSettingsOptions.length; j++) {
          if (!data.highscores[i + 1][data.lengthSettingsOptions[j]]) {
            htmlRows[i] += `<div class="grid-score">0</div>`;
          } else {
            htmlRows[i] += `<div class="grid-score">${
              data.highscores[i + 1][data.lengthSettingsOptions[j]]
            }</div>`;
          }
        }
      }
      const highscoresTable = document.querySelector(".grid-container");
      htmlRows.forEach((row) => {
        highscoresTable.innerHTML += row;
      });
      console.log(htmlRows);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

fetchUserHighScores();
