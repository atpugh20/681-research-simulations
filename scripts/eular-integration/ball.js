class Ball {
  constructor(x = 0, y = 0, radius = 5, color = "white") {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 9.80665);
    this.radius = radius;
    this.color = color;
    this.grounded = false;
  }

  update(delta_time) {
    // Eular method for the numerical integration
    this.vel.addVector(this.acc.getMult(delta_time));
    this.pos.addVector(this.vel.getMult(delta_time));

    // Stop ball on ground
    if (this.pos.y > canvas_length) {
      this.pos.y = canvas_length;
      this.grounded = true;
      this.color = "red";
      this.vel.y = 0;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
