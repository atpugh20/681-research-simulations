const RADIUS = 1;
const G = 9.80655;

const SIM_TIMES = {};
let actual_times = {};

const SIM_COUNT = 1000;
const DISTANCES = [10, 50, 100, 500, 1000];
let d_iterator = 0;

let reached_ground = false;
let first_sim = true;
let running_sims = true;
let time_hit = 0;

let delta_time;
let last_frame_time;

const ball = new Ball(
  canvas_length / 2,
  canvas_length - DISTANCES[0],
  RADIUS,
  "white"
);

function get_times_to_ground(heights, gravity) {
  const times = {};

  for (let i = 0; i < heights.length; i++) {
    let h = heights[i];
    times[h] = Math.sqrt((2 * h) / gravity);
  }

  return times;
}

function setup() {
  last_frame_time = 0;
  actual_times = get_times_to_ground(DISTANCES, G);

  console.log(actual_times);
}

function draw(current_time) {
  clearCanvas();
  delta_time = (current_time - last_frame_time) / 1000;
  last_frame_time = current_time;
  if (running_sims) {
    if (first_sim) {
      ball.run_simulations(SIM_COUNT);
      first_sim = false;
    }

    ball.update(delta_time);
    ball.draw(ctx);

    time_hit += delta_time;
    if (ball.grounded) {
      SIM_TIMES[DISTANCES[d_iterator]] = time_hit;
      time_hit = 0;
      if (d_iterator == DISTANCES.length - 1) {
        console.log("Finished.");
        return;
      } else {
        d_iterator++;
        first_sim = true;
        ball.pos.y = canvas_length - DISTANCES[d_iterator];
        ball.grounded = false;
        ball.color = "white";
      }
    }
  }

  requestAnimationFrame(draw);
}

function main() {
  setup();
  requestAnimationFrame(draw);
}

main();
