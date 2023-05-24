/* eslint-disable no-unused-vars */
function fileValidation() {
  const fileInput = document.getElementById("profile-img");

  const filePath = fileInput.value;

  // Allowing file type
  var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

  if (!allowedExtensions.exec(filePath)) {
    alert("Invalid file type");
    fileInput.value = "";
    return false;
  } else if (fileInput.files[0].size >= 500000) {
    alert("Image file is too large");
    fileInput.value = "";
    return false;
  }
}
