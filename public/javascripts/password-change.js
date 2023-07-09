/* eslint-disable no-unused-vars */

const submitButton = document.getElementById("submit-password-change");
submitButton.disabled = true;

const oldPw = document.getElementById("old-password");
const newPw = document.getElementById("new-password");
const repeatPw = document.getElementById("repeat-password");

function inputCheck() {
  if (oldPw.value === "" || newPw.value === "" || repeatPw.value === "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

function closeMessage() {
  const messageBox = document.getElementById("message-box");
  const parentElement = messageBox.parentNode;
  parentElement.removeChild(messageBox);
}

function isValidForm() {
  if (
    document.getElementById("new-password").value !==
    document.getElementById("repeat-password").value
  ) {
    document.getElementById("message-text").innerText =
      "New and repeat passwords do not match!";
    document.getElementById("message-box").style.display = "flex";
    return false;
  }
  return true;
}

const urlParams = new URLSearchParams(window.location.search);
const feedback = urlParams.get("feedback");

if (feedback === "incorrectPw") {
  document.getElementById("message-text").innerText =
    "Provided old password is incorrect";
  document.getElementById("message-box").style.display = "flex";
}
