const canvas_width = canvas.width = 200;
let delta_time;
let last_frame_time = 0;
let sim_time = 0;
let running_sims = true;
let first_sim = true;

let ball;

let time_iterator = 0;
let sim_iterator = 0;

const sim_dist = {};
const errors = {};

const TIMES = [1, 5, 10, 30, 60, 120];
const SIM_COUNT = 1;
const G = 9.80655;
const SPEED = 1;

function get_actual_dist(recorded_time) {
    return 0.5 * G * recorded_time * recorded_time;
}

function setup() {
    ball = new Ball(canvas_width / 2);

    // Get Calc times

    for (let i = 0; i < TIMES.length; i++) {
        sim_dist[TIMES[i]] = [];
        errors[TIMES[i]] = [];
    }

    console.log(errors);
}

function draw(current_time) {
    clearCanvas();
    delta_time = (current_time - last_frame_time) / 1000;
    last_frame_time = current_time;

    if (running_sims) {
        ball.update(delta_time);
        ball.draw(ctx);

        sim_time += delta_time;

        if (sim_time >= TIMES[time_iterator]) {
            if (first_sim) {
                first_sim = false;
            } else {
                const saved_dist = ball.pos.y;
                const calc_dist = get_actual_dist(sim_time);
                const error = saved_dist - calc_dist;

                console.log(`Time: ${sim_time}s`);
                console.log(`Sim Distance: ${saved_dist}m`);
                console.log(`Cal Distance: ${calc_dist}m`);
                console.log(`Abs Error: ${error}m`);
                console.log("----------------------------------------");

                sim_iterator++;

            }

            // Reset ball position
            ball.pos.y = 0;
            ball.old_pos.y = 0;
            sim_time = 0;
        }

        if (sim_iterator == SIM_COUNT) {
            time_iterator++;
            sim_iterator = 0;
        }

    }


    requestAnimationFrame(draw);
}

function main() {
    setup();
    requestAnimationFrame(draw);
}

main();