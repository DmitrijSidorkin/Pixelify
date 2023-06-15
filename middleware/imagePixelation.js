const axios = require("axios");
const { createCanvas, loadImage } = require("canvas");

async function pixelateImageFromURL(imageURL, chosenDifficulty = 2) {
  const response = await axios.get(imageURL, { responseType: "arraybuffer" });
  const originalImage = Buffer.from(response.data, "binary");

  const imageElement = await loadImage(originalImage);
  const minImageDimmension =
    imageElement.width < imageElement.height
      ? imageElement.width
      : imageElement.height;
  const pixelSize =
    Math.floor(minImageDimmension / (60 / chosenDifficulty)) + 1;
  const canvas = createCanvas(imageElement.width, imageElement.height);
  const context = canvas.getContext("2d");

  // Set canvas size to match the pixelated dimensions
  canvas.width = imageElement.width - (imageElement.width % pixelSize);
  canvas.height = imageElement.height - (imageElement.height % pixelSize);

  // Draw the image on the canvas
  context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

  // Get the pixelated image data
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // Apply pixelation
  for (let y = 0; y < canvas.height; y += pixelSize) {
    for (let x = 0; x < canvas.width; x += pixelSize) {
      let red = 0;
      let green = 0;
      let blue = 0;

      // Calculate average color within each pixel
      for (let pixelY = y; pixelY < y + pixelSize; pixelY++) {
        for (let pixelX = x; pixelX < x + pixelSize; pixelX++) {
          const pixelIndex = (pixelX + pixelY * canvas.width) * 4;

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
          const pixelIndex = (pixelX + pixelY * canvas.width) * 4;

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

module.exports.pixelateImageFromURL = pixelateImageFromURL;
