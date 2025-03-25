class Ball {
    constructor(x = 0, y = 0, radius = 5, color = "white") {
        this.pos = new Vector(x, y);
        this.vel = new Vector;
        this.acc = new Vector(0, 9806.55);
        this.radius = radius;
        this.color = color;
        this.friction = 0.8;
    }

    update(delta_time) {
        /**
         * Updates the position of the ball based on the velocity
         * and acceleration attributes.
         */

        this.vel = this.vel.add(this.acc.mult(delta_time));
        this.pos = this.pos.add(this.vel.mult(delta_time));

        // Handle wall collision  
        if (this.pos.y > canvas_length - this.radius) {
            this.pos.y = canvas_length - this.radius;
            this.vel.x *= this.friction;
            this.vel.y *= -this.friction;
        }
        if (this.pos.y < this.radius) {
            this.pos.y = this.radius;
            this.vel.x *= this.friction;
            this.vel.y *= -this.friction;
        }
        if (this.pos.x > canvas_length - this.radius) {
            this.pos.x = canvas_length - this.radius;
            this.vel.x *= -this.friction;
            this.vel.y *= this.friction;
        }
        if (this.pos.x < this.radius) {
            this.pos.x = this.radius;
            this.vel.x *= -this.friction;
            this.vel.y *= this.friction;
        }
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