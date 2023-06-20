/* eslint-disable no-unused-vars */

//will later be used for image preview
let chosenDifficulty;
const img = document.getElementById("pixelatedImage");
const imgCopy = img.cloneNode(true);

function pixelateImage(originalImage, pixelationFactor) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const originalWidth = originalImage.width;
  const originalHeight = originalImage.height;
  canvas.width = originalWidth;
  canvas.height = originalHeight;
  context.drawImage(originalImage, 0, 0, originalWidth, originalHeight);
  const originalImageData = context.getImageData(
    0,
    0,
    originalWidth,
    originalHeight
  ).data;
  if (pixelationFactor !== 0) {
    for (let y = 0; y < originalHeight; y += pixelationFactor) {
      for (let x = 0; x < originalWidth; x += pixelationFactor) {
        // extracting the position of the sample pixel
        const pixelIndexPosition = (x + y * originalWidth) * 4;
        // drawing a square replacing the current pixels
        context.fillStyle = `rgba(
          ${originalImageData[pixelIndexPosition]},
          ${originalImageData[pixelIndexPosition + 1]},
          ${originalImageData[pixelIndexPosition + 2]},
          ${originalImageData[pixelIndexPosition + 3]}
        )`;
        context.fillRect(x, y, pixelationFactor, pixelationFactor);
      }
    }
  }
  return canvas.toDataURL();
}

function chooseDifficulty(radio) {
  chosenDifficulty = parseInt(radio.value);
  const minImageDimmension = img.width < img.height ? img.width : img.height;
  const pixelSize =
    Math.floor(minImageDimmension / (60 / chosenDifficulty)) + 1;
  const newImg = pixelateImage(imgCopy, pixelSize);
  document.getElementById("pixelatedImage").src = newImg;
}
