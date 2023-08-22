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

function checkMediaLink(input, link, medium) {
  if (link === "") {
    return;
  }
  const mediaRegex = {
    facebook:
      /^(https?:\/\/)?(www\.)?facebook\.com\/(?:[a-zA-Z0-9.]+\/)?(?:profile\.php\?id=(\d+)|([a-zA-Z0-9.]+))\/?$/,
    twitter: /^(https?:\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9_]{1,15})\/?$/,
    instagram:
      /^(https?:\/\/)?(www\.)?instagram\.com\/([a-zA-Z0-9_.]{1,30})\/?$/,
    tumblr: /^(https?:\/\/)?(www\.)?tumblr\.com\/([a-zA-Z0-9_.]{1,30})\/?$/,
  };
  let matchIndex = 3;
  const match = link.match(mediaRegex[medium]);
  if (!(match && match[matchIndex])) {
    if (input.nextElementSibling) {
      return;
    }
    const linkWarning = document.createElement("p");
    linkWarning.textContent = "Provided link is invalid";
    linkWarning.setAttribute("class", "link-warning");
    input.insertAdjacentElement("afterend", linkWarning);
  } else if (input.nextElementSibling) {
    input.nextElementSibling.remove();
  }
}
