// Canvas setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas_length = 600;
canvas.width = canvas.height = canvas_length;

const FPS = 60;

const balls = [];
const colors = ["white", "red", "green", "blue", "purple", "yellow"];
const ball_count = 100;

function clearCanvas() {
  /*
  * Wipes the canvas in between each frame to display updated positions.
  */
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setup() {
    /**
     * Performs any initial setups before the first render.
     * In this case, it adds all balls to the ball array and
     * sets random velocities for each.
     */
    for (let i = 0; i < ball_count; i++) {
        balls.push(
            new Ball(
                (Math.random() * (canvas_length - 20)) + 10,
                (Math.random() * (canvas_length - 20)) + 10,
                Math.random() * 5 + 1,
                colors[Math.floor(Math.random() * colors.length)]
            )
        );
        balls[i].vel.y = Math.random() * 10 - 5;
        balls[i].vel.x = Math.random() * 10 - 5;
    }
}

function draw() {
    /**
     * Performs for each iteration of the render loop.
     * Updates and draws each element.
     */
    clearCanvas();

    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw(ctx);
    }
}

function main() {
    setup();
    setInterval(draw, 1000 / FPS);
}

main();
