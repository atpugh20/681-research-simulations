class Ball {
    constructor(x = 0, y = 0, radius = 5, color = "white") {
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 9800);
        this.radius = radius;
        this.color = color;
        this.friction = 0.8;
    }

    update(delta_time) {
        // Eular method for the numerical integration
        this.vel.addVector(this.acc.getMult(delta_time));
        this.pos.addVector(this.vel.getMult(delta_time));

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
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}