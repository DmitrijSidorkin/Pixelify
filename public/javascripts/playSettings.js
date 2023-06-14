/* eslint-disable no-unused-vars */

//will later be used for image preview
let chosenDifficulty;
const img = document.getElementById("pixelatedImage");
const imgCopy = img.cloneNode(true);

function chooseDifficulty(radio) {
  chosenDifficulty = parseInt(radio.value);
  const minImageDimmension = img.width < img.height ? img.width : img.height;
  console.log(minImageDimmension);
  const pixelSize =
    (Math.floor(minImageDimmension / 60) + 1) * chosenDifficulty;
  console.log(pixelSize);
  const newImg = pixelateImage(imgCopy, pixelSize);
  document.getElementById("pixelatedImage").src = newImg;
}

function pixelateImage(imageElement, pixelSize) {
  // Create a canvas element
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");

  // Set canvas size to match the pixelated dimensions
  canvas.width = imageElement.width - (imageElement.width % pixelSize);
  canvas.height = imageElement.height - (imageElement.height % pixelSize);

  // Draw the image on the canvas
  context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

  // Get the pixelated image data
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  var pixels = imageData.data;

  // Apply pixelation
  for (var y = 0; y < canvas.height; y += pixelSize) {
    for (var x = 0; x < canvas.width; x += pixelSize) {
      var red = 0;
      var green = 0;
      var blue = 0;

      // Calculate average color within each pixel
      for (let pixelY = y; pixelY < y + pixelSize; pixelY++) {
        for (let pixelX = x; pixelX < x + pixelSize; pixelX++) {
          let pixelIndex = (pixelX + pixelY * canvas.width) * 4;

          // Check if pixel coordinates exceed image boundaries
          if (pixelIndex >= 0 && pixelIndex < pixels.length) {
            red += pixels[pixelIndex];
            green += pixels[pixelIndex + 1];
            blue += pixels[pixelIndex + 2];
          }
        }
      }

      // Average color values
      red = Math.floor(red / (pixelSize * pixelSize));
      green = Math.floor(green / (pixelSize * pixelSize));
      blue = Math.floor(blue / (pixelSize * pixelSize));

      // Set pixel colors
      for (let pixelY = y; pixelY < y + pixelSize; pixelY++) {
        for (let pixelX = x; pixelX < x + pixelSize; pixelX++) {
          let pixelIndex = (pixelX + pixelY * canvas.width) * 4;

          // Check if pixel coordinates exceed image boundaries
          if (pixelIndex >= 0 && pixelIndex < pixels.length) {
            pixels[pixelIndex] = red;
            pixels[pixelIndex + 1] = green;
            pixels[pixelIndex + 2] = blue;
          }
        }
      }
    }
  }

  // Put the pixelated image data back onto the canvas
  context.putImageData(imageData, 0, 0);

  // Convert the canvas to a data URL
  var pixelatedImageURL = canvas.toDataURL();

  // Return the pixelated image URL
  return pixelatedImageURL;
}
