let flagHtml = "";

countries.forEach((country) => {
  flagHtml += `<img src="../../icons/flags/${country.value}.png">`;
});

document.getElementById("test").innerHTML = flagHtml;
