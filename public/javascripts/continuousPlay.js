const pageNum = parseInt(document.getElementById("pageNum").value);

if (pageNum === 1) {
  console.log(document.getElementById("button-back"));
  document.getElementById("button-back").style.visibility = "hidden";
}
