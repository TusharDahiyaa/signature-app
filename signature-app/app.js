const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");
const fontSize = document.getElementById("fontSizePicker");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = true;

if (document.body.clientWidth < 500) {
  canvas.width = 400;
  canvas.height = 300;
} else {
  canvas.width = 800;
  canvas.height = 500;
}

let isDrawing = false;

colorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvasColor.addEventListener("input", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

fontSize.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

clearButton.addEventListener("click", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener("click", (e) => {
  localStorage.setItem("canvasContents", canvas.toDataURL());
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "sign.png";
  link.click();
});

retrieveButton.addEventListener("click", (e) => {
  const dataURL = localStorage.getItem("canvasContents");
  if (!dataURL) {
    alert("No image to load");
    return;
  }
  const img = new Image();
  img.src = dataURL;
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
});
