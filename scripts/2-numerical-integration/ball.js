class Ball {
    constructor(x = 0, y = 0, radius = 5, color = "white") {
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, G);

        this.radius = radius;
        this.color = color;
    }

    euler(delta_time) {
        // Eular method for the numerical integration
        this.pos = this.pos.add(this.vel.mult(delta_time));
        this.vel = this.vel.add(this.acc.mult(delta_time));
    }

    verlet(delta_time) {
        /**
         * Uses Velocity Verlet
         */
        
        this.pos = this.pos.add(
            this.vel.mult(delta_time)
        ).add(
            this.acc.mult(0.5)
                .mult(delta_time * delta_time)
        );
        this.vel = this.vel.add(this.acc.mult(delta_time));
    }

    rk4(delta_time) {
        /**
         * Uses the fourth order Runge-Kutta method.
         */
        let k1 = this.vel;
        let k2 = this.vel.add(this.acc.mult(delta_time / 2));
        let k3 = this.vel.add(this.acc.mult(delta_time / 2));
        let k4 = this.vel.add(this.acc.mult(delta_time));

        this.pos = this.pos.add(
            k1.add(
                k2.mult(2).add(
                    k3.mult(2).add(
                        k4
                    )
                )
            ).mult(delta_time / 6));

        this.vel = this.vel.add(this.acc.mult(delta_time));
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}