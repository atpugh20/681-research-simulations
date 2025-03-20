const RADIUS = 1;
const G = 9.80655;

const SIM_TIMES = {};
let actual_times = {};

const SIM_COUNT = 50;
const DISTANCES = [10, 50, 100, 500, 1000];
let s_iterator = 0;
let d_iterator = 0;

let reached_ground = false;
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

  // Start simulations
  if (running_sims) {
    // Update ball for new frame
    ball.update(delta_time);
    ball.draw(ctx);

    time_hit += delta_time; // update current sim time

    // Check if the ball has hit the ground
    if (ball.grounded) {
      // Check if it is the last sim
      if (s_iterator == SIM_COUNT) {
        s_iterator = 0;
        d_iterator++;
        SIM_TIMES[DISTANCES[d_iterator]] = time_hit;
      }

      console.log(d_iterator, ":", s_iterator, "at", time_hit);

      if (d_iterator == DISTANCES.length) {
        console.log("Finished.");
        return;
      } else {
        s_iterator++;
        ball.pos.y = canvas_length - DISTANCES[d_iterator];
        ball.vel.y = 0;
        ball.grounded = false;
        ball.color = "white";
      }
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
