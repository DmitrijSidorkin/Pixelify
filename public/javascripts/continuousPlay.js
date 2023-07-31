const currentPath = window.location.pathname;
const sessionId = currentPath.split("/")[2];
const pageNum = currentPath.split("/")[3];
const form = document.querySelector(".guess-form");

function fetchPlayGameData() {
  if (parseInt(pageNum) === 1) {
    document.getElementById("button-back").style.visibility = "hidden";
  }
  fetch(`/fetch-play-game-data/${sessionId}/${pageNum}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data = JSON.parse(data);

      //generating fieldset options
      let fieldsetOptions = "";
      data.gamesArray.forEach((game, index) => {
        fieldsetOptions += `<div>
               <input class="field-input" type="radio" id="guess-${index}"
               name="guess" value="${game.gameName}">
               <label for="guess-${index}">${game.gameName}</label>
             </div>`;
      });
      document.getElementById("gameGuesses").innerHTML = fieldsetOptions;

      const elemIdInput = `<input type="hidden" id="elemId" name="elemId" value="${data.pageGameDataId}" />`;
      form.innerHTML += elemIdInput;

      //creating image element and adding it to page html
      const imageElement = document.createElement("img");
      imageElement.src = "data:image/png;base64" + data.image;
      imageElement.className = "card-image";
      document.querySelector(".image-box").appendChild(imageElement);
      document.querySelector(".loader-wrapper").style.display = "none";
      document.querySelector(".card-content").style.display = "flex";
    });
}

fetchPlayGameData();

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const elemId = document.getElementById("elemId").value;
  const action = event.submitter.value;
  const additionalData = { sessionId, pageNum, action, elemId };
  //creating a hidden input element with necessary data and submitting form
  const additionalDataInput = document.createElement("input");
  additionalDataInput.type = "hidden";
  additionalDataInput.name = "additionalData";
  additionalDataInput.value = JSON.stringify(additionalData);
  form.appendChild(additionalDataInput);
  form.submit();
});
