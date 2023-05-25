/* eslint-disable no-unused-vars */
let countrySelect = document.getElementById("country");
const userCountry = document.getElementById("user-country").innerText;

for (let i = 0; i < countrySelect.options.length; i++) {
  if (countrySelect.options[i].value === userCountry) {
    countrySelect.options[i].setAttribute("selected", true);
  }
}

const maxDate = document.getElementById("birth-date").max;

function checkDate(date) {
  if (date.value > maxDate) {
    alert("you picked an invalid date");
    date.value = "";
  }
}
