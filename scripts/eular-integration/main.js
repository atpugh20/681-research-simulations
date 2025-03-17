function setup() {

}

function draw() {
    clearCanvas();
}

function main() {
    setup();
    setInterval(draw, 1000 / FPS);
}

main();