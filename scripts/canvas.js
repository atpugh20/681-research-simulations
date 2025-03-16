const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas_length =
  window.innerWidth < 900 || window.innerHeight < 600 ? 350 : 600;
canvas.width = canvas.height = canvas_length;

const FPS = 60;

console.log(window.innerHeight);

function clearCanvas() {
  /*
   * Wipes the canvas in between each frame to display updated positions.
   */
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
