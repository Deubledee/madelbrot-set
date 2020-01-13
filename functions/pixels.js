
import { html } from '@polymer/polymer';
export const fillPixels = function (superClass) {
    return class extends superClass {

        static get setPixelsHtml() {
            return html` 
                    <h3> color values </h3> 
                                       
                    <h4 class="h41"> within limit </h4> 

                    <div class="pixels1">   
                        <cms-dropdown-menu 
                            items="[[mdPixelsColorsRed]]"  
                            horizontal-align="left" 
                            vertical-align="top" 
                            scroll-action="refit"
                            res="{{mdPixelsResponse}}">            
                        </cms-dropdown-menu> 
                    </div>
                    <div class="pixels2">    
                        <cms-dropdown-menu 
                            items="[[mdPixelsColorsGreen]]"  
                            horizontal-align="left" 
                            vertical-align="top" 
                            scroll-action="refit"
                            res="{{mdPixelsResponse}}">            
                        </cms-dropdown-menu> 
                    </div>
                    <div class="pixels3">   
                        <cms-dropdown-menu 
                            items="[[mdPixelsColorsBlue]]"  
                            horizontal-align="left" 
                            vertical-align="top" 
                            scroll-action="refit"
                            res="{{mdPixelsResponse}}">            
                        </cms-dropdown-menu> 
                    </div> 

                    <h4 class="h42"> out of limit </h4>   

                    <div>     
                        <cms-dropdown-menu 
                            items="[[nmdPixelsColorsRed]]"  
                            horizontal-align="left" 
                            vertical-align="top" 
                            scroll-action="refit"
                            res="{{nmdPixelsResponse}}">            
                        </cms-dropdown-menu> 
                    </div>
                    <div>     
                        <cms-dropdown-menu 
                            items="[[nmdPixelsColorsGreen]]"  
                            horizontal-align="left" 
                            vertical-align="top" 
                            scroll-action="refit"
                            res="{{nmdPixelsResponse}}">            
                        </cms-dropdown-menu> 
                    </div>
                    <div> 
                        <cms-dropdown-menu 
                            items="[[nmdPixelsColorsBlue]]"  
                            horizontal-align="left" 
                            vertical-align="top" 
                            scroll-action="refit"
                            res="{{nmdPixelsResponse}}">            
                        </cms-dropdown-menu> 
                    </div>
            `
        }
        static get properties() {
            return {
                averageLimit: {
                    type: Number,
                    value: 8
                },
                mdPixelsColors: {
                    type: Object,
                    value: { red: "patern7", green: "patern7", blue: "patern7" }
                },
                nmdPixelsColors: {
                    type: Object,
                    value: { red: "patern15", green: "average", blue: "patern15" }
                },
                mdPixelsColorsRed: {
                    type: Array,
                    notify: true,
                    computed: 'setPixelsColorsAndPaterns(dimentions,"mdPixelsColors","red")'
                },
                mdPixelsColorsGreen: {
                    type: Array,
                    notify: true,
                    computed: 'setPixelsColorsAndPaterns(dimentions,"mdPixelsColors","green")'
                },
                mdPixelsColorsBlue: {
                    type: Array,
                    notify: true,
                    computed: 'setPixelsColorsAndPaterns(dimentions,"mdPixelsColors","blue")'
                },
                nmdPixelsColorsRed: {
                    type: Array,
                    notify: true,
                    computed: 'setPixelsColorsAndPaterns(dimentions,"nmdPixelsColors","red")'
                },
                nmdPixelsColorsGreen: {
                    type: Array,
                    notify: true,
                    computed: 'setPixelsColorsAndPaterns(dimentions,"nmdPixelsColors","green")'
                },
                nmdPixelsColorsBlue: {
                    type: Array,
                    notify: true,
                    computed: 'setPixelsColorsAndPaterns(dimentions,"nmdPixelsColors","blue")'
                },
                mdPixelsResponse: {
                    type: Object,
                    notify: true,
                    observer: '_setMdPixelsPattern'
                },
                nmdPixelsResponse: {
                    type: Object,
                    notify: true,
                    observer: '_setNmdPixelsPattern'
                },
                killAnimation: Number
            }
        }
        ready() {
            super.ready();
        }
        _setMdPixelsPattern(data) {
            let par = Object.keys(data).pop()
            this.mdPixelsColors[par] = data[par]
        }
        _setNmdPixelsPattern(data) {
            let par = Object.keys(data).pop()
            this.nmdPixelsColors[par] = data[par]
        }
        setPixelsColorsAndPaterns(set, type, color) {
            if (!!set) {
                let arr = [], obj1 = {}, obj2 = {}
                obj1[color] = this[type][color]
                obj2.items = [
                    'average',
                    'patern1',
                    'patern2',
                    'patern3',
                    'patern4',
                    'patern5',
                    'patern6',
                    'patern7',
                    'patern8',
                    'patern9',
                    'patern10',
                    'patern11',
                    'patern12',
                    'patern13',
                    'patern14',
                    'patern15',
                    'patern16',
                    'patern17',
                    'patern18',
                    'patern19',
                    'patern20'
                ]
                arr.push(obj1)
                arr.push(obj2)
                return arr
            }
        }

        startPixelsAnimation(ctx, width, height) {
            console.info('pixels started');

            window.onbeforeunload = function () {
                return 'playing'
            }
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
                            obj.average = average

                            obj.patern1 = (average * b / cb / b * this.iterationCount)

                            obj.patern2 = (average * a / cb * a * this.iterationCount)
                            obj.patern3 = (average * b / cb * b * this.iterationCount)

                            obj.patern4 = (average * ca * this.iterationCount)

                            obj.patern5 = (average * a * ca * a * this.iterationCount)
                            obj.patern6 = (average * b / ca * b * this.iterationCount)

                            obj.patern7 = (average * ca / cb * this.iterationCount)

                            obj.patern8 = (average * a * this.iterationCount)


                            obj.patern9 = (average * b * ca * this.iterationCount)
                            obj.patern10 = (average * a / cb * this.iterationCount)

                            obj.patern11 = (average * a / cb + b / this.iterationCount)

                            obj.patern12 = (average * a / b * this.iterationCount)
                            obj.patern13 = (average * a / b * ca * this.iterationCount)
                            obj.patern14 = (average * a / cb * ca * this.iterationCount)

                            obj.patern15 = (average * a / ca * this.iterationCount)
                            obj.patern16 = (average * b / cb * a * this.iterationCount)
                            obj.patern17 = (average * b / ca * a * this.iterationCount)

                            obj.patern18 = (average * b / this.iterationCount)
                            obj.patern19 = (average * a / cb * b * this.iterationCount)


                            if (n === this.iterationCount) {
                                pixels[pixelIndex] = obj[this.mdPixelsColors.red]
                                pixels[pixelIndex + 1] = obj[this.mdPixelsColors.green]
                                pixels[pixelIndex + 2] = obj[this.mdPixelsColors.blue]
                                pixels[pixelIndex + 3] = 255;
                            } else {
                                pixels[pixelIndex] = obj[this.nmdPixelsColors.red]
                                pixels[pixelIndex + 1] = obj[this.nmdPixelsColors.green]
                                pixels[pixelIndex + 2] = obj[this.nmdPixelsColors.blue]
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
