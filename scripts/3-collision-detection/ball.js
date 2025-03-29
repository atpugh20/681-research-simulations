class Ball {
    constructor(x = 0, y = 0, radius = 50, color = "white") {
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);

        this.radius = radius;
        this.color = color;
    }

    update(delta_time) {
        /**
         * Use Euler integration to move the ball since we do not care
         * about accuracy for this part of it, just for the detection.
         */
        this.pos = this.pos.add(this.vel.mult(delta_time));
        this.vel = this.vel.add(this.acc.mult(delta_time));
    }

    distanceDetection(other_ball, delta_time) {
        this.update(delta_time);
        const x_delta = other_ball.pos.x - this.pos.x;
        const y_delta = other_ball.pos.y - this.pos.y;
        const dist = Math.sqrt(x_delta * x_delta + y_delta * y_delta);

        const combined_radius = other_ball.radius + this.radius;

        if (dist <= combined_radius) {
            this.acc = this.acc.mult(0);
            this.vel = this.vel.mult(0);
        }

        return dist - combined_radius;
    }

    continuousDetection(delta_time) {
        this.update(delta_time);

    }

    satDetection(delta_time) {
        this.update(delta_time);

    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}