const image = document.getElementById("user-country");

function imageExists(imageUrl) {
  var http = new XMLHttpRequest();

  http.open("HEAD", imageUrl, false);
  http.send();
  return http.status != 404;
}

const exists = imageExists(image.src);
if (!exists) {
  image.remove();
}
