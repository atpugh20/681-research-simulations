const balls = [];
const BALL_COUNT = 100;

const ball_gap = canvas.width / BALL_COUNT;

let delta_time;
let last_frame_time;

function setup() {
    last_frame_time = 0;

    for (let i = 0; i < BALL_COUNT; i++) {
        balls.push(
            new Ball((i * ball_gap) + (ball_gap / 2), 0, ball_gap / 2, "white")
        );
        balls[i].vel.y = i * 100;
    }
}

function draw(current_time) {
    clearCanvas();

    delta_time = (current_time - last_frame_time) / 1000;
    last_frame_time = current_time;

    for (let i = 0; i < balls.length; i++) {
        balls[i].update(delta_time);
        balls[i].draw(ctx);
    }

    requestAnimationFrame(draw);
}

function main() {
    setup();
    requestAnimationFrame(draw);
}

main();