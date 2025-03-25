class Ball {
    constructor(x = 0, y = 0, radius = 5, color = "white") {
        this.pos = new Vector(x, y);
        this.old_pos = this.pos.clone();
        this.acc = new Vector(0, 9.80655);

        this.radius = radius;
        this.color = color;
    }

    update(delta_time) {
        /**
         * This updates the time using Verlet Integration. The equation is:
         * new_pos = 2 * current_pos - old_pos + acc * (dt)^2
         */
        let new_pos = this.pos
            .mult(2)
            .sub(this.old_pos)
            .add(this.acc.mult(delta_time * delta_time));

        this.old_pos = this.pos.clone();
        this.pos = new_pos;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}