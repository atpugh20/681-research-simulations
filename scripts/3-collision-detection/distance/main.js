const canvas_width = canvas.width = 200;

let delta_time;
let last_frame_time = 0;

let running_sims = true;
let ball1, ball2;

const RADIUS = 50;
const accelerations = [10000, 1000, 100];
const SIM_COUNT = 10;

const errors = {};

let sim_iterator = 0;
let acc_iterator = 0;

function setup() {
    ball1 = new Ball(canvas_width / 2, 0, RADIUS, "cyan");
    ball2 = new Ball(canvas_width / 2, canvas_length, RADIUS, "pink");

    for (let i = 0; i < accelerations.length; i++) {
        errors[accelerations[i]] = [];
    }

    ball1.acc.y = accelerations[0];
    ball2.acc.y = -accelerations[0];
}

function draw(current_time) {
    clearCanvas();

    // Delta time calculation
    delta_time = (current_time - last_frame_time) / 1000;
    last_frame_time = current_time;
    let dist_between;

    // Start simulations
    if (running_sims) {
        ball1.distanceDetection(ball2, delta_time);
        dist_between = ball2.distanceDetection(ball1, delta_time);
        ball1.draw(ctx);
        ball2.draw(ctx);

        // Check if the balls have collided;
        if (ball1.acc.y == 0) {
            sim_iterator++;
            console.log(dist_between);
            errors[accelerations[acc_iterator]].push(dist_between)

            ball1.pos.y = 0;
            ball2.pos.y = canvas_length;
            ball1.acc.y = accelerations[acc_iterator];
            ball2.acc.y = -accelerations[acc_iterator];
        }

        // Check if number of sims have been run
        if (sim_iterator == SIM_COUNT) {
            sim_iterator = 0;
            acc_iterator++;
        }

        // Check if the final simulation is done
        if (acc_iterator == accelerations.length) {
            running_sims = false;
            ball1.acc.y = 0;
            ball2.acc.y = 0;
            ball1.pos.y = 0;
            ball2.pos.y = canvas_length;

            console.log(errors);
        }
    }

    requestAnimationFrame(draw);
}

function main() {
    setup();
    requestAnimationFrame(draw);
}

main();