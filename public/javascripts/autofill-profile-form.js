/* eslint-disable no-unused-vars */
let countrySelect = document.getElementById("country");
let userCountry = document.getElementById("user-country-name");

for (let i = 0; i < countrySelect.options.length; i++) {
  if (countrySelect.options[i].value === userCountry.innerText) {
    countrySelect.options[i].setAttribute("selected", true);
    userCountry.remove();
  }
}

const maxDate = document.getElementById("birth-date").max;

function checkDate(date) {
  if (date.value > maxDate) {
    alert("you picked an invalid date");
    date.value = "";
  }
}
