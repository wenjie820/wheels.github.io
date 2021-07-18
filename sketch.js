let wheels = [];
let wheelNum = 10;
let pointNum = 13;
let lenMean = 50;
let lenSd = 25;
let layer = 4;
let nameParam = "";
let msg = "";
// let vid;
let gif;

function setup() {
  // createCanvas(500, 500);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5");

  lenMean = width/10;
  lenSd = lenMean/2;

  imageMode(CENTER);
  // vid = createVideo("data/background.mp4", vidLoad);
  // vid.hide();
  gif = loadGif("data/background.gif");

  for (let j = 0; j < layer; j++) {
    for (let i = wheelNum*j; i < wheelNum*(j+1); i++) {
      let len = randomGaussian(lenMean*(j+1), lenSd);
      let w = [];
      w.push(random(-0.005, -0.001));
      w.push(random(0.001, 0.005));
      wheels[i] = new Wheel(width/2, width/2, len, w[Math.floor(random(0, 2))], pointNum);
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
    nameParam = "";
  } else {
    nameParam = " "+nameParam;
  }

  msg = "Hello" + nameParam + ", Welcome!";

  document.body.style.overflow="hidden";
  document.body.addEventListener("touchmove", function (e) {
    e.preventDefault();
  }, {passive: false});  

  let size = 100;
  var qrcode = new QRCode("qrcode", {
      text: "welcome: "+nameParam,
      width: size,
      height: size,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
  });

  document.getElementById("qrcode").style.left=width/2-size/2+"px";
  document.getElementById("qrcode").style.top=height-size-100+"px";
}

function draw() {
  background(0);
  // // image(vid, width/2, height/2, height*2, height);
  // // image(gif, width/2, height/2);

  for (let wheel of wheels) {
    wheel.show();
  }
  
  fill(255);
  noStroke();
  textSize(32);
  textAlign(CENTER);
  text(msg, width/2, height-30);
}

// function vidLoad() {
//   vid.loop();
//   vid.volume(0);
// }

// function touchStarted(event) {
//   vid.loop();
//   vid.volume(0);
// }

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if(r != null) {
    return decodeURI(r[2]);
  }
  return null;
}
