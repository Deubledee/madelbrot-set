
import { html } from '@polymer/polymer';
import '../elements/cms-dropdown-menu';
export const tracePath = function (superClass) {
    return class extends superClass {

        static get setTraceHtml() {
            return html` 
            <div>   
                <cms-dropdown-menu 
                    items="[[mdTraceColorsRed]]"  
                    horizontal-align="left" 
                    vertical-align="top" 
                    scroll-action="refit"
                    res="{{mdTraceResponse}}">            
                </cms-dropdown-menu> 
            </div>
            <div>    
                <cms-dropdown-menu 
                    items="[[mdTraceColorsGreen]]"  
                    horizontal-align="left" 
                    vertical-align="top" 
                    scroll-action="refit"
                    res="{{mdTraceResponse}}">            
                </cms-dropdown-menu> 
            </div>
            <div>   
                <cms-dropdown-menu 
                    items="[[mdTraceColorsBlue]]"  
                    horizontal-align="left" 
                    vertical-align="top" 
                    scroll-action="refit"
                    res="{{mdTraceResponse}}">            
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
                mdTraceColors: {
                    type: Object,
                    value: { red: "average", green: "patern7", blue: "patern7" }
                },
                mdTraceResponse: {
                    type: Object,
                    notify: true,
                    observer: '_setMdTracePattern'
                },
                mdTraceColorsRed: {
                    type: Array,
                    notify: true,
                    computed: 'setTraceColorsAndPaterns(dimentions,"red")'
                },
                mdTraceColorsGreen: {
                    type: Array,
                    notify: true,
                    computed: 'setTraceColorsAndPaterns(dimentions,"green")'
                },
                mdTraceColorsBlue: {
                    type: Array,
                    notify: true,
                    computed: 'setTraceColorsAndPaterns(dimentions,"blue")'
                },
                killAnimation: Number
            }
        }
        ready() {
            super.ready();
        }
        _setMdTracePattern(data) {
            let color = Object.keys(data).pop()
            this.mdTraceColors[color] = data[color]
        }

        setTraceColorsAndPaterns(set, color) {
            if (!!set) {
                let arr = [], obj1 = {}, obj2 = {}
                obj1[color] = this.mdTraceColors[color]
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
                    'patern19'
                ]
                arr.push(obj1)
                arr.push(obj2)
                return arr
            }
        }
        startTraceAniamtion(ctx, width, height) {
            window.onbeforeunload = function () {
                return 'playing'
            }
            console.info(this.minval, 'trace started');
            this.stop = false
            let obj = {}
            let drawTrace = () => {
                try {
                    if (this.stop === true) {
                        cancelAnimationFrame(this.killAnimation);
                        console.info('trace stoped');
                        return
                    }
                    this.killAnimation = requestAnimationFrame(drawTrace)
                    let XPosition = this.minval,
                        YPosition = this.maxval
                    //  let region = new Path2D();
                    for (let x = 0; x < width; x++) {
                        this.ctx.beginPath();
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
                            obj.average = average
                            obj.patern1 = (average * a * b * this.iterationCount)
                            obj.patern2 = (average * b * this.iterationCount)
                            obj.patern3 = (average * a * this.iterationCount)

                            obj.patern4 = (average * ca * cb * this.iterationCount)
                            obj.patern5 = (average * cb * this.iterationCount)
                            obj.patern6 = (average * ca * this.iterationCount)

                            obj.patern7 = (average * b * ca * this.iterationCount)
                            obj.patern8 = (average * a * cb * this.iterationCount)

                            obj.patern9 = (average * a * ca * this.iterationCount)

                            obj.patern10 = (average * b * cb * this.iterationCount)
                            obj.patern11 = (average * a * b * ca * this.iterationCount)
                            obj.patern12 = (average * a * cb * ca * this.iterationCount)

                            obj.patern13 = (average * b * cb * a * this.iterationCount)
                            obj.patern14 = (average * b * cb * b * this.iterationCount)
                            obj.patern15 = (average * b * ca * a * this.iterationCount)

                            obj.patern16 = (average * b * ca * b * this.iterationCount)
                            obj.patern17 = (average * a * cb * a * this.iterationCount)
                            obj.patern18 = (average * a * cb * b * this.iterationCount)

                            obj.patern19 = (average * a * ca * a * this.iterationCount)

                            obj.patern20 = (average * a * ca * a * ca * this.iterationCount)

                            if (n === this.iterationCount) {
                                ctx.moveTo((x + a), (y + b));
                                ctx.lineTo((x + a) + 1, (y + b));
                            } else {
                                ctx.moveTo((x + a), (y + b));
                                ctx.lineTo((x + a) + 1, (y + b));
                            }
                            ctx.strokeStyle = `rgb(${obj[this.mdTraceColors.red]}, ${obj[this.mdTraceColors.green]}, ${obj[this.mdTraceColors.blue]})`;
                        }
                        ctx.stroke();
                    }
                }

                catch (err) {
                    this.stop = true
                    cancelAnimationFrame(this.killAnimation)
                    throw err
                }
            }
            drawTrace()
        }
    }
}
