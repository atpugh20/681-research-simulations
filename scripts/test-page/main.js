const balls = [];
const colors = ["white", "red", "green", "blue", "purple", "yellow"];
const ball_count = 100;

let last_frame_time;
let delta_time;

let can_update = true;

function setup() {
    /**
     * Performs any initial setups before the first render.
     * In this case, it adds all balls to the ball array and
     * sets random velocities for each.
     */
    last_frame_time = 0;

    for (let i = 0; i < ball_count; i++) {
        balls.push(
            new Ball(
                Math.random() * (canvas_length - 20) + 10,
                Math.random() * (canvas_length - 20) + 10,
                Math.random() * 5 + 1,
                colors[Math.floor(Math.random() * colors.length)]
            )
        );
        balls[i].vel.y = Math.random() * 1000 - 500;
        balls[i].vel.x = Math.random() * 1000 - 500;
    }
}

function draw(current_time) {
    /**
   * Performs for each iteration of the render loop.
   * Updates and draws each element.
   */
    clearCanvas();

    delta_time = (current_time - last_frame_time) / 1000;
    last_frame_time = current_time;

    for (let i = 0; i < balls.length; i++) {
        if (can_update) {
            balls[i].update(delta_time);
        }
        balls[i].draw(ctx);
    }
    if (!can_update) {
        can_update = true;
    }
    requestAnimationFrame(draw);
}

function main() {
    setup();
    requestAnimationFrame(draw);
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        can_update = false;
    }
});

main();
