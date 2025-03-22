const canvas_width = (canvas.width = 200);
let delta_time;
let last_frame_time = 0;

const RADIUS = 10;
const G = 9.80655;
const SIM_COUNT = 10;
const TIMES = [1, 5, 10, 30, 60, 120]; // Seconds
const SPEED = 50;

const errors = {};
const sim_dist = {};
let actual_dist = {};

let sim_time = 0;
let sim_iterator = 0;
let time_iterator = 0;

let first_sim = true;
let running_sims = true;
let ball;

function get_actual_distances(times, gravity) {
  const heights = {};
  let t;
  for (let i = 0; i < times.length; i++) {
    t = times[i];
    heights[t] = 0.5 * gravity * t * t;
  }

  return heights;
}

function setup() {
  actual_dist = get_actual_distances(TIMES, G);

  for (let i = 0; i < TIMES.length; i++) {
    sim_dist[TIMES[i]] = [];
    errors[TIMES[i]] = [];
  }

  ball = new Ball(canvas_width / 2, 0, RADIUS, "white");
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

    // Update current sim time
    sim_time += delta_time;

    // If the right time has passed, log, then move to next time
    if (sim_time >= TIMES[time_iterator]) {
      // Skip the first simulation due to time inaccuracy
      if (first_sim) {
        first_sim = false;
      } else {
        let saved_dist = ball.pos.y;
        let calc_dist = actual_dist[TIMES[time_iterator]];
        let error = Math.abs(saved_dist - calc_dist);

        sim_dist[TIMES[time_iterator]].push(saved_dist);
        errors[TIMES[time_iterator]].push(error);

        sim_iterator++;
        console.log(`Time: ${sim_time}s`);
        console.log(`Sim Distance: ${saved_dist}m`);
        console.log(`Cal Distance: ${calc_dist}m`);
        console.log(`Abs Error: ${error}m`);
        console.log("----------------------------------------");
      }

      // Reset ball to top of canvas
      sim_time = 0;
      ball.pos.y = 0;
      ball.vel.mult(0);
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

function main() {
  setup();
  requestAnimationFrame(draw);
}

main();
