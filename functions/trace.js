export const tracePath = function (superClass) {
    return class extends superClass {
        ready() {
            super.ready();
        }
        drawTrace() {
            let XPosition = this.minval,
                YPosition = this.maxval,
                didIT = false
            for (var x = 0; x < this.canvas.width; x++) {
                this.ctx.beginPath();
                for (var y = 0; y < this.canvas.height; y++) {
                    if (stop === false) {
                        var a = map(x - 125, 0, this.canvas.width * this.scaleValue, XPosition, YPosition);
                        var b = map(y, 0, this.canvas.height * this.scaleValue, XPosition, YPosition);
                        var ca = a
                        var cb = b
                        var n = 0;
                        while (n < this.iterationCount) {
                            var aa = a * a - b * b;
                            var bb = 2 * a * b;
                            a = aa + ca;
                            b = bb + cb;
                            if (a * a + b * b > this.limit) {
                                break;
                            }
                            n++;
                        }
                        var bright = map(n, 0, this.iterationCount, 0, 8);
                        bright = Math.random(1) * map(Math.sqrt(bright), 1, 0.5, 1, 255);
                        var pix = (x + y * this.canvas.width) * 4;
                        if (n == this.iterationCount) {
                            this.ctx.moveTo(x + a, y + b);
                            this.ctx.lineTo((x + a) + 1, (y + b));
                            didIT = false
                        } else {
                            didIT = true
                        }
                    } else {
                        return
                    }
                }
                if (!!didIT) {
                    this.ctx.strokeStyle = 'white';

                } else {
                    this.ctx.strokeStyle = 'grey';
                }
                this.ctx.stroke();
            }
        }

        startTraceAniamtion() {
            this.time = setTimeout(() => {
                if (this.stop === false) {
                    requestAnimationFrame((this.startTraceAniamtion).bind(this))
                    this.drawTrace()
                } else {
                    clearTimeout(this.time)
                    cancelAnimationFrame((this.startTraceAniamtion).bind(this))
                    this.top = false
                }
            }, 60);
        }
    }
}
