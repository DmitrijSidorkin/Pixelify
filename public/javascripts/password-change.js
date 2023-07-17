/* eslint-disable no-unused-vars */

const submitButton = document.getElementById("submit-password-change");
submitButton.disabled = true;

const oldPw = document.getElementById("old-password");
const newPw = document.getElementById("new-password");
const repeatPw = document.getElementById("repeat-password");
const messageBox = document.getElementById("message-box");
const messageText = document.getElementById("message-text");

function inputCheck() {
  if (oldPw.value === "" || newPw.value === "" || repeatPw.value === "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

function closeMessage() {
  messageBox.style.display = "none";
}

const changePasswordForm = document.getElementById("change-password-form");

changePasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const oldPassword = document.getElementById("old-password").value;
  const newPassword = document.getElementById("new-password").value;
  const repeatPassword = document.getElementById("repeat-password").value;

  if (newPassword !== repeatPassword) {
    messageText.innerText = "New and repeat passwords do not match!";
    messageBox.className = "message-box-alert";
    messageBox.style.display = "flex";
    return;
  }
  fetch("/update-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword,
      repeatPassword: repeatPassword,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        messageText.innerText = "Incorrect old password";
        messageBox.className = "message-box-alert";
      }
      if (response.status === 200) {
        messageText.innerText = "Password changed successfully";
        messageBox.className = "message-box-success";
      }
      messageBox.style.display = "flex";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
