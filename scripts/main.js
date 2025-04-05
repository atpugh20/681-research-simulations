const canvas_width = (canvas.width = 200);
let delta_time;
let last_frame_time = 0;

const errors = {};
const sim_dist = {};

let sim_time = 0;
let sim_iterator = 0;
let time_iterator = 0;
let frame_iterator = 0;

let first_sim = true;
let running_sims = true;
let ball;

const G = 9.80655;
const SIM_COUNT = 1;
const TIMES = [1, 5, 10, 30]; // Seconds
const SPEED = 1;

function get_dist(recorded_time) {
  return 0.5 * G * (recorded_time * recorded_time);
}

function setup() {
  for (let i = 0; i < TIMES.length; i++) {
    sim_dist[TIMES[i]] = [];
    errors[TIMES[i]] = [];
  }

  ball = new Ball(canvas_width / 2);
}

function draw(current_time) {
  clearCanvas();
  delta_time = (current_time - last_frame_time) / 1000;
  last_frame_time = current_time;

  // Prevent the sim_time from going over the target time
  if (sim_time + delta_time > TIMES[time_iterator]) {
    delta_time = TIMES[time_iterator] - sim_time;
  }

  delta_time *= SPEED;

  // Start simulations
  if (running_sims) {
    // Update ball for new frame
    frame_iterator++;

    ball.rk4(delta_time);
    ball.draw(ctx);

    // Update current sim time
    sim_time += delta_time;

    // If the right time has passed, log, then move to next time
    if (sim_time >= TIMES[time_iterator]) {
      // Skip the first simulation due to time inaccuracy
      if (first_sim) {
        first_sim = false;
      } else {
        const saved_dist = ball.pos.y;
        const calc_dist = get_dist(sim_time);
        const error = Math.abs(saved_dist - calc_dist);

        sim_dist[TIMES[time_iterator]].push(saved_dist);
        errors[TIMES[time_iterator]].push(error);

        sim_iterator++;
        console.log(`Frames: ${frame_iterator}`);
        console.log(`Time: ${sim_time}s`);
        console.log(`Sim Distance: ${saved_dist}m`);
        console.log(`Cal Distance: ${calc_dist}m`);
        console.log(`Abs Error: ${error}m`);
        console.log("---------------------------------");

        frame_iterator = 0;
      }

      // Reset ball to top of canvas
      sim_time = 0;
      ball.pos.y = 0;
      ball.vel.y = 0;
      ball.old_pos.y = 0;
    }

    // Check if the final sim has been completed
    if (sim_iterator == SIM_COUNT) {
      time_iterator++;
      sim_iterator = 0;
    }

    // Check if the final test has been completed
    if (time_iterator == TIMES.length) {
      console.log("Finished.");
      console.log(sim_dist);
      console.log(errors);
      running_sims = false;
    }
  }

  requestAnimationFrame(draw);
}

// TODO
// 1. Leave canvas blank on entry
// 2. Have buttons for
//  a. Test
//  b. Euler, stormer, velverlet, rk4
//  c. Speed
// 3. Potential buttons for integration and collision

function main() {
  setup();
  requestAnimationFrame(draw);
}

main();
