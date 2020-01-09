export const tracePath = function (superClass) {
    return class extends superClass {
        ready() {
            super.ready();
        }
        drawTrace() {
            let XPosition = minval, YPosition = maxval
            let red, green, blue
            let didIT = false
            for (var x = 0; x < canvas.width; x++) {
                ctx.beginPath(); for (var y = 0; y < canvas.height; y++) {
                    if (stop === false) {
                        var a = map(x - 125, 0, canvas.width * scaleValue, XPosition, YPosition);
                        var b = map(y, 0,
                            canvas.height * scaleValue, XPosition, YPosition);
                        var ca = a
                        var cb = b
                        var n = 0;
                        while (n < maxiterations) {
                            var aa = a * a - b * b;
                            var bb = 2 * a * b;
                            a = aa + ca;
                            b = bb + cb;
                            if (a * a + b * b > limit) {
                                break;
                            }
                            n++;
                        }
                        var bright = map(n, 0, maxiterations, 0, 8);
                        bright = Math.random(1) * map(Math.sqrt(bright), 1, 0.5, 1, 255);
                        var pix = (x + y * canvas.width) * 4;
                        if (n == maxiterations) {
                            ctx.moveTo(x + a, y + b);
                            ctx.lineTo((x + a) + 1, (y + b));
                            didIT = false
                        } else {
                            didIT = true
                        }
                    } else {
                        return
                    }
                }
                if (!!didIT) {
                    ctx.strokeStyle = 'white';

                } else {
                    ctx.strokeStyle = 'grey';
                }
                ctx.stroke();
            }
        }

        startTraceAniamtion() {
            let time = setTimeout(() => {
                if (stop === false) {
                    requestAnimationFrame(startTraceAniamtion)
                    drawTrace()
                } else {
                    clearTimeout(time)
                    stop = false
                }
            }, 60);
        }
    }
}
