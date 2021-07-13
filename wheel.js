class Wheel {
    constructor(x, y, len, w, num) {
      this.center = createVector(x, y);
      this.len = len;
      this.points = [];
      this.num = num;
      this.initAngle = map(random(1), 0, 1, 0, TWO_PI);
      this.angleVelocity = w;
      this.connectors = [];
      this.intervals = [];

      let psize = randomGaussian(0.01, 1);
      let palpha = map(this.size, 0.01, 30, 10, 200);
      for(let i = 0; i < this.num; i++) {
          let angle = this.initAngle + map(i, 0, this.num, 0, TWO_PI);
          this.points[i] = new Point(this.center.x, this.center.y, this.len, angle, psize, palpha);
      }
    }

    addConnector(wheel) {
        if(wheel.connectors.length > 3) return;

        this.connectors.push(wheel);
        this.intervals.push(Math.floor(random(1, this.points.length - 1)));

        wheel.addConnector(this);
    }

    connect(wheel, interval) {
        for(let i = 0; i < this.points.length; i++) {
            const point1 = this.points[i];
            const point2 = wheel.points[(i+interval)%this.points.length]

            let lalpha = map(point1.size, 0.01, 30, 10, 100);
            strokeWeight(0.6);
            stroke(255, lalpha);
            line(point1.pos.x, point1.pos.y, point2.pos.x, point2.pos.y);
        }
    }
  
    show() {
      push();
      translate(this.center.x, this.center.y);

      fill(255);
    //   ellipse(0, 0, 5);

    //   noFill();
    //   stroke(255, 50);
    //   ellipse(0, 0, this.len*2);
      
      for (let point of this.points) {
        point.update(this.angleVelocity);
        point.show();
      }
      
      for(let i = 0; i < this.connectors.length; i++) {
        const wheel = this.connectors[i];
        const interval = this.intervals[i];
        this.connect(wheel, interval);
      }
      pop();
    }
}