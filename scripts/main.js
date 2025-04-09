const euler_button = document.getElementById("euler-button");
const stormer_button = document.getElementById("stormer-button");
const vel_verlet_button = document.getElementById("vel-button");
const rk4_button = document.getElementById("rk4-button");

const canvas_width = (canvas.width = 200);
let delta_time;
let last_frame_time = 0;

const errors = {};
const sim_dist = {};
const actual_dist = {};

let sim_time = 0;
let sim_iterator = 0;
let time_iterator = 0;
let frame_iterator = 0;

let first_sim = true;
let running_sims = false;
let method = "e";
let ball;

const G = 9.80655;
const SIM_COUNT = 1;
const TIMES = [1, 10, 30, 60, 121]; // Seconds
const SPEED = 1;

function setup() {
  for (let i = 0; i < TIMES.length; i++) {
    sim_dist[TIMES[i]] = [];
    errors[TIMES[i]] = [];
    actual_dist[TIMES[i]] = 0.5 * G * (TIMES[i] * TIMES[i]);
  }

  ball = new Ball(canvas_width / 2);
}

function draw(current_time) {
  clearCanvas();
  delta_time = (current_time - last_frame_time) / 1000;
  last_frame_time = current_time;

  delta_time = 1;

  // Prevent the sim_time from going over the target time
  if (sim_time + delta_time > TIMES[time_iterator]) {
    delta_time = TIMES[time_iterator] - sim_time;
  }

  delta_time *= SPEED;

  // Start running simulations.
  if (method != "e") {
    frame_iterator++;

    // Run update method that the user chooses with the buttons
    switch (method) {
      case "a":
        ball.euler(delta_time);
        break;
      case "b":
        ball.stormer(delta_time, frame_iterator);
        break;
      case "c":
        ball.velVerlet(delta_time);
        break;
      case "d":
        ball.rk4(delta_time);
        break;
      default:
        break;
    }

    ball.draw(ctx);

    // Update the amount of time spent on current drop
    sim_time += delta_time;

    // If the time limit is reached, log the distance and move to next time limit
    if (sim_time >= TIMES[time_iterator]) {
      // Skip the first simulation due to time inaccuracy
      if (first_sim) {
        first_sim = false;
      } else {
        const saved_dist = ball.pos.y;
        const calc_dist = actual_dist[TIMES[time_iterator]];
        const error = Math.abs(saved_dist - calc_dist);

        // Save distance and error values to hashmaps
        sim_dist[TIMES[time_iterator]].push(saved_dist);
        errors[TIMES[time_iterator]].push(error);

        // Log the stats of the finished drop to the console
        sim_iterator++;
        console.log(`Delta Time: ${sim_time / frame_iterator}`);
        console.log(`Time: ${sim_time}s`);
        console.log(`Sim Distance: ${saved_dist}m`);
        console.log(`Cal Distance: ${calc_dist}m`);
        console.log(`Abs Error: ${error}m`);
        console.log("---------------------------------");

        frame_iterator = 0;
      }

      // Reset ball to top of canvas
      sim_time = 0;
      ball.reset();
    }

    // Check if the final sim for the current time limit has been completed
    if (sim_iterator == SIM_COUNT) {
      time_iterator++;
      sim_iterator = 0;
    }

    // Check if the final overall sim for all time limits has been completed
    if (time_iterator == TIMES.length) {
      console.log("Finished.");
      console.log(sim_dist);
      console.log(errors);

      // Reset variables for potential new simulations
      time_iterator = 0;
      sim_iterator = 0;
      method = "e";
    }
  }

  requestAnimationFrame(draw);
}

function main() {
  setup();
  requestAnimationFrame(draw);
}

// Allows the user to choose the method with the buttons on the screen
euler_button.addEventListener("click", () => {
  if (method == "e")
    method = "a";
});
stormer_button.addEventListener("click", () => {
  if (method == "e") {
    ball.reset();
    method = "b";
  }
});
vel_verlet_button.addEventListener("click", () => {
  if (method == "e") {
    ball.reset();
    method = "c";
  }
});
rk4_button.addEventListener("click", () => {
  if (method == "e") {
    method = "d";
    ball.reset();
  }
});

main();
