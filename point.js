class Point {
    constructor(x, y, len, angle, size, alpha) {
      this.center = createVector(x, y);
      this.len = len;
      this.angle = angle;
      this.size = size;
      this.alpah = alpha;
      this.pos = createVector();
      this.pos.x = this.len * cos(this.angle);
      this.pos.y = this.len * sin(this.angle);
    }
  
    update(angle) {
      this.angle += angle;
      this.pos.x = this.len * cos(this.angle);
      this.pos.y = this.len * sin(this.angle);
    }
  
    show() {
      push();
      noStroke();
      fill(255, this.alpah);
      ellipse(this.pos.x, this.pos.y, this.size);
      pop();
    }
}