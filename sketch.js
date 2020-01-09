// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/6z7GQewK-Ks

var minval = -1.5;
var maxval = 1.5,
  step = 0.0001,
  xStart = minval,
  yStart = maxval
var xCoord;
var yCoord;

var frDiv, btn
var stop = false

var XPos = undefined,  // -3,
  YPos = undefined,
  scaleValue = 1

function setup() {
  let myCanvas = createCanvas(600, 600);
  myCanvas.parent('myContainer');
  console.log(myCanvas)
  pixelDensity(1);

  xCoord = createSlider(minval, maxval, xStart, step);
  yCoord = createSlider(minval, maxval, yStart, step);
  //translate(translatePos.x, translatePos.y);
  frDiv = createDiv('');
  btn = createButton('');
  btn.html('stop')
  btn.mousePressed(stopAniamtion)
}
var maxiterations = 150;
var ca = 0
var cb = 0
function draw() {
  loadPixels();
  var XPosition = XPos || xCoord.value(),  // -3,
    YPosition = YPos || yCoord.value() //2.5
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      //  console.log(stop)
      if (stop === false) {
        var a = map(x, 0, width * scaleValue, XPosition, YPosition);
        var b = map(y, 0, height * scaleValue, XPosition, YPosition);

        ca = a
        cb = b

        var n = 0;

        while (n < maxiterations) {
          var aa = a * a - b * b;
          var bb = 2 * a * b;
          a = aa + ca;
          b = bb + cb;
          if (a * a + b * b > 111.555555) {
            break;
          }
          n++;
        }

        var bright = map(n, 0, maxiterations, 0, 8);
        bright = Math.random(1) * map(sqrt(bright), 1, 0.5, 1, 255);
        var pix = (x + y * width) * 4;
        let patern1 = (bright * ca * cb * maxiterations),
          patern2 = (bright * cb * maxiterations),
          patern3 = (bright * ca * maxiterations),
          patern4 = (bright * a * b * maxiterations),
          patern5 = (bright * b * maxiterations),
          patern6 = (bright * a * maxiterations),
          patern7 = (bright * b * ca * maxiterations),
          patern8 = (bright * a * cb * maxiterations),
          patern9 = (bright * a * cb * ca * maxiterations)
        let red, green, blue
        if (n == maxiterations) {
          red = patern6
          green = patern3
          blue = patern4
          pixels[pix + 0] = green
          pixels[pix + 1] = green
          pixels[pix + 2] = blue
          pixels[pix + 3] = 255;
        } else {
          red = patern7
          green = patern8
          blue = patern9
          pixels[pix + 0] = green
          pixels[pix + 1] = green
          pixels[pix + 2] = red
          pixels[pix + 3] = 255;
        }
      } else {
        return
      }
    }
  }
  updatePixels();
  frDiv.html(`frm/Rate - ${floor(frameRate())}  <br> <b> X  </b> - ${xCoord.value()} <b> Y  </b> - ${yCoord.value()}`);
}

function stopAniamtion() {
  if (stop === true) {
    stop = false
    draw()
  } else {
    stop = true
  }
}
/*function mousePressed(evt) {
  console.log(evt)
  // prevent default
  return false;
}*/
