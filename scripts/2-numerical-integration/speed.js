const G = 9.80655;

function measureTime(method_name = "euler", steps, delta_time) {
    let ball = new Ball();

    let start_time = performance.now();

    switch (method_name) {
        case "euler":
            for (let i = 0; i < steps; i++)
                ball.euler(delta_time);
            break;
        case "verlet":
            for (let i = 0; i < steps; i++)
                ball.verlet(delta_time);
            break;
        case "rk4":
            for (let i = 0; i < steps; i++)
                ball.rk4(delta_time);
            break;
    }

    let end_time = performance.now();

    return end_time - start_time;
}

function getAverage(input_array) {
    let sum = 0;
    for (let i = 0; i < input_array.length; i++) {
        sum += input_array[i];
    }

    return sum / input_array.length;
}

function main() {
    const delta_time = 0.01;
    const steps = 100000;
    const simulations = 1000;

    const methods = ["euler", "verlet", "rk4"];
    const speeds = {};

    for (let i = 0; i < methods.length; i++) {
        const m = methods[i]
        speeds[m] = [];
        for (let j = 0; j < simulations; j++) {
            speeds[m].push(measureTime(m, steps, delta_time));
        }

        console.log(m + "\t" + getAverage(speeds[m]));
    }
}

main();


