class Ball {
  constructor(x = 0, y = 0, radius = 5, color = "white") {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, G);


    this.old_pos = this.pos.clone();

    this.radius = radius;
    this.color = color;
  }

  euler(delta_time) {
    // Eular method for the numerical integration
    this.pos = this.pos.add(this.vel.mult(delta_time));
    this.vel = this.vel.add(this.acc.mult(delta_time));
  }

  stormer(delta_time) {
    let new_pos = this.pos.mult(2).sub(this.old_pos).add(this.acc.mult(delta_time * delta_time));
    this.old_pos.y = this.pos.y;
    this.pos.y = new_pos;
  }

  velVerlet(delta_time) {
    /**
     * Uses Velocity Verlet
     */

    this.pos = this.pos
      .add(this.vel.mult(delta_time))
      .add(this.acc.mult(0.5).mult(delta_time * delta_time));
    this.vel = this.vel.add(this.acc.mult(delta_time));
  }

  rk4(delta_time) {
    /**
     * Uses the fourth order Runge-Kutta method.
     */
    let k1 = this.vel;
    let k2 = this.vel.add(this.acc.mult(delta_time).div(2));
    let k3 = this.vel.add(this.acc.mult(delta_time).div(2));
    let k4 = this.vel.add(this.acc.mult(delta_time));

    this.pos = this.pos.add(
      k1.add(k2.mult(2).add(k3.mult(2).add(k4))).mult(delta_time / 6)
    );

    this.vel = this.vel.add(this.acc.mult(delta_time));
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  reset() {
    this.pos.y = 0;
    this.vel.y = 0;
    this.old_pos.y = 0;
  }
}
