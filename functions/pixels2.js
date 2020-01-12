
drawPixels(minval, maxval, ctx, width, height, scaleValue, averageLimit, iterationCount) {
    let XPosition = minval,
        YPosition = maxval
    let IMAGEDATA = ctx.getImageData(0, 0, width, height)
    let pixels = IMAGEDATA.data

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) { // console.log(stop) 
            if (stop === false) {
                let a = map(x - 125, 0, width * scaleValue, XPosition, YPosition);
                let b = map(y, 0, height * scaleValue, XPosition, YPosition);
                let ca = a
                let cb = b
                let n = 0;
                while (n < iterationCount) {
                    let aa = a * a - b * b;
                    let bb = 2 * a * b;
                    a = aa + ca;
                    b = bb + cb;
                    if (a * a + b * b > limit) {
                        break;
                    }
                    n++;
                }
                let average = map(n, 0, iterationCount, 0, averageLimit);
                average = Math.random(1) * map(Math.sqrt(average), 1, 0.5, 1, 255);
                let pixelIndex = (x + y * width) * 4;
                /* let obj = paterns
                 obj.patern1 = (average * ca * cb * iterationCount)
                 obj.patern2 = (average * cb * iterationCount)
                 obj.patern3 = (average * ca * iterationCount)
                 obj.patern4 = (average * a * b * iterationCount)
                 obj.patern5 = (average * b * iterationCount)
                 obj.patern6 = (average * a * iterationCount)
                 obj.patern7 = (average * a * ca * iterationCount)
                 obj.patern8 = (average * a * cb * iterationCount)
                 obj.patern9 = (average * b * ca * iterationCount)
                 obj.patern10 = (average * b * ca * iterationCount)
                 obj.patern11 = (average * a * cb * ca * iterationCount)
                 obj.patern12 = (average * b * cb * ca * iterationCount)*/

                if (n == iterationCount) {
                    pixels[pixelIndex] = average
                    pixels[pixelIndex + 1] = average
                    pixels[pixelIndex + 2] = average
                    pixels[pixelIndex + 3] = 255;
                } else {
                    pixels[pixelIndex] = ndmColors.red
                    pixels[pixelIndex + 1] = ndmColors.green
                    pixels[pixelIndex + 2] = ndmColors.blue
                    pixels[pixelIndex + 3] = 255;
                }
            } else {
                return
            }
        }
    }
    ctx.putImageData(IMAGEDATA, 0, 0)
}
