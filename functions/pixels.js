export const fillPixels = function (superClass) {
    return class extends superClass {
        ready() {
            super.ready();
        }
        drawPixels() {
            let XPosition = minval, YPosition = maxval
            let IMAGEDATA = ctx.getImageData(0, 0, canvas.width, canvas.height)
            let pixels = IMAGEDATA.data
            let red, green, blue
            for (let x = 0; x < canvas.width; x++) {
                for (let y = 0; y < canvas.height; y++) { // console.log(stop) 
                    if (stop === false) {
                        let a = map(x - 125, 0, canvas.width * scaleValue, XPosition, YPosition); let b = map(y, 0, canvas.height *
                            scaleValue, XPosition, YPosition);
                        let ca = a
                        let cb = b
                        let n = 0;
                        while (n < maxiterations) {
                            let aa = a * a - b * b;
                            let bb = 2 * a * b;
                            a = aa + ca;
                            b = bb + cb;
                            if (a * a + b * b > limit) {
                                break;
                            }
                            n++;
                        }
                        let bright = map(n, 0, maxiterations, 0, 8);
                        bright = Math.random(1) * map(Math.sqrt(bright), 1, 0.5, 1, 255);
                        let pix = (x + y * canvas.width) * 4;
                        let patern1 = (bright * ca * cb * maxiterations),
                            patern2 = (bright * cb * maxiterations),
                            patern3 = (bright * ca * maxiterations),
                            patern4 = (bright * a * b * maxiterations),
                            patern5 = (bright * b * maxiterations),
                            patern6 = (bright * a * maxiterations),
                            patern7 = (bright * b * ca * maxiterations),
                            patern8 = (bright * a * cb * maxiterations),
                            patern9 = (bright * a * cb * ca * maxiterations)


                        if (n == maxiterations) {
                            red = patern6
                            green = patern3
                            blue = patern4
                            pixels[pix + 0] = red
                            pixels[pix + 1] = green
                            pixels[pix + 2] = red
                            pixels[pix + 3] = 255;
                        } else {
                            red = patern7
                            green = patern8
                            blue = patern9
                            pixels[pix + 0] = red
                            pixels[pix + 1] = green
                            pixels[pix + 2] = red
                            pixels[pix + 3] = 255;
                        }
                    } else {
                        return
                    }
                }
            }
            ctx.putImageData(IMAGEDATA, 0, 0)
        }

        startPixelsAnimation() {
            let time = setTimeout(() => {
                if (stop === false) {
                    requestAnimationFrame(startPixelsAnimation)
                    drawPixels()
                } else {
                    clearTimeout(time)
                    stop = false
                }
            }, 60);
        }
    }
}



