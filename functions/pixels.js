export const fillPixels = function (superClass) {
    return class extends superClass {
        static get properties() {
            return {
                mdColors: {
                    type: Object,
                    value: { red: "patern9", green: "patern8", blue: "patern9" }
                },
                nmdColors: {
                    type: Object,
                    value: { red: "patern7", green: "patern8", blue: "patern7" }
                },
                averageLimit: {
                    type: Number,
                    value: 8
                },
                killAnimation: Number
            }
        }
        ready() {
            super.ready();
        }

        startPixelsAnimation(ctx, width, height) {
            console.info('pixels started');
            this.stop = false
            let obj = {}
            try {
                let drawPixels = () => {
                    if (this.stop === true) {
                        cancelAnimationFrame(this.killAnimation);
                        console.info('pixels stoped');
                        return
                    }
                    this.killAnimation = requestAnimationFrame(drawPixels)
                    let XPosition = this.minval,
                        YPosition = this.maxval
                    let IMAGEDATA = ctx.getImageData(0, 0, width, height)
                    let pixels = IMAGEDATA.data

                    for (let x = 0; x < width; x++) {
                        for (let y = 0; y < height; y++) {
                            let a = this.map(x - 125, 0, width * this.scaleValue, XPosition, YPosition);
                            let b = this.map(y, 0, height * this.scaleValue, XPosition, YPosition);
                            let ca = a
                            let cb = b
                            let n = 0;
                            while (n < this.iterationCount) {
                                let aa = a * a - b * b;
                                let bb = 2 * a * b;
                                a = aa + ca;
                                b = bb + cb;
                                if (a * a + b * b > this.limit) {
                                    break;
                                }
                                n++;
                            }
                            let average = this.map(n, 0, this.iterationCount, 0, this.averageLimit);
                            average = Math.random(1) * this.map(Math.sqrt(average), 1, 0.5, 1, 255);
                            let pixelIndex = (x + y * width) * 4;
                            obj.patern1 = (average * ca * cb * this.iterationCount)
                            obj.patern2 = (average * cb * this.iterationCount)
                            obj.patern3 = (average * ca * this.iterationCount)
                            obj.patern4 = (average * a * b * this.iterationCount)
                            obj.patern5 = (average * b * this.iterationCount)
                            obj.patern6 = (average * a * this.iterationCount)
                            obj.patern7 = (average * b * ca * this.iterationCount)
                            obj.patern8 = (average * a * cb * this.iterationCount)
                            obj.patern9 = (average * a * cb * ca * this.iterationCount)
                            obj.patern10 = (average * b * cb * ca * this.iterationCount)
                            obj.patern11 = (average * a * ca * this.iterationCount)
                            obj.patern12 = (average * a * b * ca * this.iterationCount)
                            if (n === this.iterationCount) {
                                pixels[pixelIndex] = obj[this.mdColors.red]
                                pixels[pixelIndex + 1] = obj[this.mdColors.green]
                                pixels[pixelIndex + 2] = obj[this.mdColors.blue]
                                pixels[pixelIndex + 3] = 255;
                            } else {
                                pixels[pixelIndex] = obj[this.nmdColors.red]
                                pixels[pixelIndex + 1] = obj[this.nmdColors.green]
                                pixels[pixelIndex + 2] = obj[this.nmdColors.blue]
                                pixels[pixelIndex + 3] = 255;
                            }
                        }
                    }
                    ctx.putImageData(IMAGEDATA, 0, 0)
                }
                drawPixels()
            }
            catch (err) {
                this.stop = true
                cancelAnimationFrame(this.killAnimation)
                throw err
            }
        }
    }
}
