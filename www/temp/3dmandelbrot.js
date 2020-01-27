var mdSConsts = {
    minval: -2.75,
    maxval: 2.75,
    step: 0.01,
    xStart: -2.75,
    yStart: 2.75,
    xCoord: Number,
    yCoord: Number,
    frDiv: Object,
    btn: Object,
    stop: false,
    maxiterations: 100,
    a: Number,
    b: Number,
    ca: this.a,
    cb: this.b,
    stopAniamtion() {
        if (stop === true) {
            mdSConsts.stop = false
            draw()
        } else {
            mdSConsts.stop = true
        }
    }
}

var xCoord;
var yCoord;

function setup() {
    createCanvas(600, 600);
    pixelDensity(1);
    mdSConsts.xCoord = createSlider(mdSConsts.minval, mdSConsts.maxval, mdSConsts.yStart, mdSConsts.step).value();
    mdSConsts.yCoord = createSlider(mdSConsts.minval, mdSConsts.maxval, mdSConsts.yStart, mdSConsts.step).value();
    mdSConsts.frDiv = createDiv('');
    mdSConsts.btn = createButton('');
    mdSConsts.btn.html('stop')
    mdSConsts.btn.mousePressed(mdSConsts.stopAniamtion)
}

function draw() {
    loadPixels();
    let XPosition = mdSConsts.xCoord,  // -3,
        YPosition = mdSConsts.yCoord //2.5
    for (let x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            //letconsole.log(stop)
            if (mdSConsts.stop === false) {
                var a = map(x, 0, width, XPosition, YPosition);
                var b = map(y, 0, height, XPosition, YPosition);

                var ca = a;
                var cb = b;

                var n = 0;

                while (n < mdSConsts.maxiterations) {
                    var aa = a * a - b * b;
                    var bb = 2 * a * b;
                    a = aa + ca;
                    b = bb + cb;
                    mdSConsts.a = a
                    mdSConsts.b = b
                    if (a * a + b * b > 16) {
                        break;
                    }
                    n++;
                }

                let bright = map(n, 0, mdSConsts.maxiterations, 0, 3);
                bright = Math.random(1) * map(sqrt(bright), 1, 0.5, 1, 255);
                let pix = (x + y * width) * 4;
                let patern1 = (bright * ca * cb * mdSConsts.maxiterations),
                    patern2 = (bright * cb * mdSConsts.maxiterations),
                    patern3 = (bright * ca * mdSConsts.maxiterations),
                    patern4 = (bright * a * b * mdSConsts.maxiterations),
                    patern5 = (bright * b * mdSConsts.maxiterations),
                    patern6 = (bright * a * mdSConsts.axiterations),
                    patern7 = (bright * b * ca * mdSConsts.maxiterations),
                    patern8 = (bright * a * cb * mdSConsts.maxiterations),
                    patern9 = (bright * a * cb * ca * mdSConsts.maxiterations)
                let red, green, blue
                if (n == mdSConsts.maxiterations) {
                    red = patern6
                    green = patern3
                    blue = patern4
                    pixels[pix + 0] = red
                    pixels[pix + 1] = green
                    pixels[pix + 2] = blue
                    pixels[pix + 3] = 255;
                } else {
                    red = patern7
                    green = patern8
                    blue = patern9
                    pixels[pix + 0] = red
                    pixels[pix + 1] = green
                    pixels[pix + 2] = blue
                    pixels[pix + 3] = 255;
                }
            } else {
                return
            }
        }
    }
    updatePixels();
    mdSConsts.frDiv.html(floor(frameRate()));
}


