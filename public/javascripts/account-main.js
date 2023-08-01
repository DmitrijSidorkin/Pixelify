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
  if (userData.mediaLinks) {
    userInfo += `<div class="account-media-links">
    <p class="account-media-text">Social Media:</p>`;
    Object.keys(userData.mediaLinks).forEach((key) => {
      userInfo += `<a class="social-media-link" href="${userData.mediaLinks[key]}"
  ><img
    class="social-media-icon"
    src="../../icons/social-media-icons/${key}.svg"
  />
</a>`;
    });
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

function generateHighscores(highscores, lengthSettingsOptions) {
  let htmlRows = "";
  lengthSettingsOptions.forEach((setting) => {
    htmlRows += `<div class="grid-length">${setting}</div>`;
    Object.keys(highscores).forEach((difficulty) => {
      if (!highscores[difficulty][setting]) {
        htmlRows += `<div class="grid-score">0</div>`;
      } else {
        htmlRows += `<div class="grid-score">${highscores[difficulty][setting]}</div>`;
      }
    });
  });
  document.querySelector(".grid-container").innerHTML += htmlRows;
}

function fetchUserData() {
  fetch(`fetch-user-data`, {
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
      generateHighscores(data.highscores, data.lengthSettingsOptions);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const currentURL = window.location.href;
const accountMainPattern = /\/account$/;
const viewProfilePattern = /\/view-profile\/[a-zA-Z0-9-]+$/;

if (accountMainPattern.test(currentURL)) {
  fetchUserData();
}

if (viewProfilePattern.test(currentURL)) {
  const dataInput = document.querySelector(".hidden-profile-data");
  const lengthSettingsOptionsInput = document.querySelector(
    ".hidden-length-settings"
  );
  const highscoresInput = document.querySelector(".hidden-highscores");
  const data = JSON.parse(decodeURIComponent(dataInput.value));
  const lengthSettingsOptions = lengthSettingsOptionsInput.value
    .split(",")
    .map(Number);
  const highscores = JSON.parse(decodeURIComponent(highscoresInput.value));
  dataInput.remove();
  lengthSettingsOptionsInput.remove();
  highscoresInput.remove();

  document.querySelector(".user-info").innerHTML = generateUserInfoHtml(data);
  generateHighscores(highscores, lengthSettingsOptions);
}
