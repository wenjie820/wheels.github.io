let wheels = [];
let wheelNum = 10;
let pointNum = 13;
let lenMean = 50;
let lenSd = 25;
let layer = 4;
let nameParam = "";
let msg = "";

function setup() {
  createCanvas(500, 500);

  for (let j = 0; j < layer; j++) {
    for (let i = wheelNum*j; i < wheelNum*(j+1); i++) {
      let len = randomGaussian(lenMean*(j+1), lenSd);
      let w = [];
      w.push(random(-0.005, -0.001));
      w.push(random(0.001, 0.005));
      wheels[i] = new Wheel(width/2, height/2, len, w[Math.floor(random(0, 2))], pointNum);
    }
  }

  for(let i = 0; i < wheels.length; i++) {
    const wheel = wheels[i];
    while(wheel.connectors.length < 3) {
      let idx = Math.floor(random(0, wheels.length));
      wheel.addConnector(wheels[idx]);
    }
  }
  
  nameParam = getQueryString("name");
  if(nameParam == null) {
    nameParam = "Text";
  }

  msg = "Welcome " + nameParam + " !!!";
}

function draw() {
  background(0);

  for (let wheel of wheels) {
    wheel.show();
  }
  
  fill(255);
  noStroke();
  textSize(32);
  text(msg, width/2-120, height-10);
}

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if(r != null) {
    return decodeURI(r[2]);
  }
  return null;
}