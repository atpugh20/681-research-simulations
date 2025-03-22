const canvas_width = canvas.width = 200;
let delta_time;
let last_frame_time;

const RADIUS = 10;
const G = 9.80655;
const SIM_COUNT = 1;
const DISTANCES = [10, 50, 100, 500, 1000];
const SPEED = 1;

let sim_iterator = 0;
let dist_iterator = 0;

const sim_times = {};
let actual_times = {};
let reached_ground = false;
let running_sims = true;
let is_first_sim = true;
let time_hit = 0;

const ball = new Ball(
    canvas_width / 2,
    canvas_length - DISTANCES[0],
    RADIUS,
    "white"
);

function get_times_to_ground(heights, gravity) {
    /**
     * Calculates what the times to hit the ground SHOULD be based off
     * the distances given in the array heights. It then returns a map
     * with the height as the key and the time as the value.
     */

    const times = {};

    for (let i = 0; i < heights.length; i++) {
        let h = heights[i];
        times[h] = Math.sqrt((2 * h) / gravity);
    }

    return times;
}

function get_array_average(input_array) {
    if (input_array.length == 0) return 0;

    let sum = 0;
    for (let i = 0; i < input_array.length; i++)
        sum += input_array[i];

    return sum / input_array.length;
}

function get_errors(actuals, sims, distances) {
    let error = 0.0;
    const errors = {};

    for (let i = 0; i < distances.length; i++) {
        errors[distances[i]] = [];
        for (let j = 0; j < sims[distances[i]].length; j++) {
            console.log(sims[distances[i]][j]);
            console.log(actuals[distances[i]]);
            error = sims[distances[i]][j] - actuals[distances[i]];
            errors[distances[i]].push(error);
        }
    }
    return errors;
}

function setup() {
    last_frame_time = 0;
    actual_times = get_times_to_ground(DISTANCES, G);
    for (let i = 0; i < DISTANCES.length; i++) {
        sim_times[DISTANCES[i]] = [];
    }
    console.log(actual_times);
}

function draw(current_time) {
    clearCanvas();
    delta_time = (current_time - last_frame_time) / 1000;
    last_frame_time = current_time;
    delta_time *= SPEED;

    // Start simulations
    if (running_sims) {
        // Update ball for new frame
        ball.update(delta_time);
        ball.draw(ctx);

        time_hit += delta_time; // update current sim time

        // Check if the ball has hit the ground
        if (ball.grounded) {

            // Ignore very first simulation. Is often an inaccurate time.
            if (is_first_sim) {
                is_first_sim = false;
            } else {
                sim_times[DISTANCES[dist_iterator]].push(time_hit);
                sim_iterator++;
            }

            // Check if this is the last sim for this distance
            if (sim_iterator == SIM_COUNT) {
                sim_iterator = 0;
                dist_iterator++;
            }

            // Check if it is the final sim overall
            if (dist_iterator == DISTANCES.length) {
                console.log(sim_times);
                const errors = get_errors(actual_times, sim_times, DISTANCES);
                console.log(errors);
                console.log("Finished.");
                return;
            }

            // Reset ball for next simulation
            ball.pos.y = canvas_length - DISTANCES[dist_iterator];
            ball.vel.y = 0;
            ball.grounded = false;
            ball.color = "white";
            time_hit = 0;
        }
    }

    requestAnimationFrame(draw);
}

function main() {
    setup();
    requestAnimationFrame(draw);
}

main();
