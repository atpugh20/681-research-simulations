class Ball {
  constructor(x = 0, y = 0, radius = 5, color = "white") {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, G);
    this.radius = radius;
    this.color = color;
  }

  update(delta_time) {
    // Eular method for the numerical integration
    this.vel = this.vel.add(this.acc.mult(delta_time));
    this.pos = this.pos.add(this.vel.mult(delta_time));
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
