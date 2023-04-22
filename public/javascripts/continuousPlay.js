/* eslint-disable no-unused-vars */

//page numeration
let pageNum = parseInt(localStorage.getItem("pageNum"));
if (pageNum) {
  console.log("there is a page num");
  document.getElementById("page-counter").innerText = `${pageNum} of 20`;
} else {
  console.log("there is NO page num");
  document.getElementById("page-counter").innerText = "1 of 20";
  localStorage.setItem("pageNum", "1");
  pageNum = 1;
}
if (pageNum === 5) {
  document.getElementsById("button-next").innerText = "Finish";
}

//on clicking next
function nextGuess() {
  const guesses = document.querySelectorAll('input[name="guess"]');
  const gameName = document.getElementById("game-name").innerText;

  //saving currect guess data
  localStorage.setItem(`${pageNum}.gameName`, gameName);
  localStorage.setItem(
    `${pageNum}.imgLink`,
    document.getElementById("img-link").innerText
  );

  //checking for user guess and saving guess status (correct/wrong)
  for (const guess of guesses) {
    if (guess.checked) {
      guess.value === gameName
        ? localStorage.setItem(`${pageNum}.userGuess`, "correct")
        : localStorage.setItem(`${pageNum}.userGuess`, "wrong");
    }
  }

  //checking for whether this is the last guess or not and redirecting accordingly
  if (pageNum === 5) {
    //results upload functionality (maybe)
    localStorage.removeItem("pageNum");
    location.href = "/results";
  } else {
    localStorage.setItem("pageNum", pageNum + 1);
    location.href = "/play";
  }
}

//placeholder
function prevGuess() {
  console.log("prev nig");
}
