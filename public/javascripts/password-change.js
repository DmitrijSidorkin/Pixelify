/* eslint-disable no-unused-vars */

function inputCheck() {
  if (
    document.getElementById("old-password").value === "" ||
    document.getElementById("new-password").value === "" ||
    document.getElementById("repeat-password").value === ""
  ) {
    document.getElementById("submit-password-change").disabled = true;
  } else {
    document.getElementById("submit-password-change").disabled = false;
  }
}

function closeMessage() {
  document.getElementById("message-box").style.display = "none";
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
