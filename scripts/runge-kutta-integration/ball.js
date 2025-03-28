class Ball {
    constructor(x = 0, y = 0, radius = 5, color = "white") {
        this.pos = new Vector(x, y);
        this.vel = new Vector;
        this.acc = new Vector(0, G);
        this.radius = radius;
        this.color = color;
    }

    update(delta_time) {

        let k1 = this.vel;
        let k2 = this.vel.add(this.acc.mult(delta_time / 2));
        let k3 = this.vel.add(this.acc.mult(delta_time / 2));
        let k4 = this.vel.add(this.acc.mult(delta_time));

        this.vel = this.vel.add(this.acc.mult(delta_time));
        this.pos = this.pos.add(
            k1.add(
                k2.mult(2).add(
                    k3.mult(2).add(
                        k4
                    )
                )
            ).mult(delta_time / 6));
    }

    draw(ctx) {
        /**
         * Draws the ball to the canvas using the position, radius,
         * and color attributes
         */
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}