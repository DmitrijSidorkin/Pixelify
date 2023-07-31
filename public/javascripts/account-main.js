function generateUserInfoHtml(userData) {
  let userInfo = `<div class="personal-info">`;
  if (userData.realName) {
    userInfo += `<p class="personal-info-item">Name: ${userData.realName}</p>`;
  }
  if (userData.birthDate) {
    userInfo += `<p class="personal-info-item">Age: ${calculateAge(
      userData.birthDate
    )}</p>`;
  }
  if (userData.location) {
    userInfo += `<p class="personal-info-item">Location: ${userData.location}</p>`;
  }
  userInfo += "</div>";
  if (userData.bio) {
    userInfo += `<p class="bio">${userData.bio}</p>`;
  }
  return userInfo;
}

function calculateAge(birthdate) {
  const birthDateObj = new Date(birthdate);
  const currentDateObj = new Date();

  // Get the difference between the years
  let age = currentDateObj.getFullYear() - birthDateObj.getFullYear();

  // Check if the birthdate hasn't occurred yet this year
  const birthMonth = birthDateObj.getMonth();
  const currentMonth = currentDateObj.getMonth();
  const birthDay = birthDateObj.getDate();
  const currentDay = currentDateObj.getDate();

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--;
  }
  return age;
}

function fetchUserHighScores() {
  fetch(`fetch-user-highscores`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".user-info").innerHTML = generateUserInfoHtml(
        data.userData
      );
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
