
import { html } from '@polymer/polymer';
import '../elements/cms-dropdown-menu';
export const tracePath = function (superClass) {
    return class extends superClass {

        static get setTraceHtml() {
            return html` 
            <h3 show$="[[show]]">trace color values </h3>             
            <div class="pixels">   
                <cms-dropdown-menu 
                    items="[[mdTraceColorsRed]]"  
                    horizontal-align="left" 
                    vertical-align="top" 
                    scroll-action="refit"
                    res="{{mdTraceResponse}}">            
                </cms-dropdown-menu> 
            </div>
            <div class="pixels">    
                <cms-dropdown-menu 
                    items="[[mdTraceColorsGreen]]"  
                    horizontal-align="left" 
                    vertical-align="top" 
                    scroll-action="refit"
                    res="{{mdTraceResponse}}">            
                </cms-dropdown-menu> 
            </div>
            <div class="pixels">   
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
                averagetraceLimit: {
                    type: Number,
                    value: 8
                },
                mdTraceColors: {
                    type: Object,
                    value: { red: "average", green: "patern3", blue: "average" }
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
                traceMinval: {
                    type: Number,
                    value: -1.5
                },
                traceMaxval: {
                    type: Number,
                    value: 1.5,
                },
                traceScaleValue: {
                    type: Number,
                    value: 1,
                },
                traceIterationCount: {
                    type: Number,
                    value: 150,
                },
                traceLimit: {
                    type: Number,
                    value: 20
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
                ]
                arr.push(obj1)
                arr.push(obj2)
                return arr
            }
        }
        startTraceAniamtion(ctx, width, height) {
            window.onbeforeunload = function () {
                return 'playing?'
            }
            if (this.stop === false) {
                console.info('trace started');
            }
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
                    let XPosition = this.traceMinval,
                        YPosition = this.traceMaxval
                    for (let x = 0; x < width; x++) {
                        this.ctx.beginPath();
                        for (let y = 0; y < height; y++) {
                            let a = this.map(x - 125, 0, width * this.traceScaleValue, XPosition, YPosition);
                            let b = this.map(y, 0, height * this.traceScaleValue, XPosition, YPosition);
                            let ca = a
                            let cb = b
                            let n = 0;
                            while (n < this.traceIterationCount) {
                                let aa = a * a - b * b;
                                let bb = 2 * a * b;
                                a = aa + ca;
                                b = bb + cb;
                                if (a * a + b * b > this.traceLimit) {
                                    break;
                                }
                                n++;
                            }
                            let average = this.map(n, 0, this.traceIterationCount, 0, this.averagetraceLimit);
                            average = Math.random(1) * this.map(Math.sqrt(average), 1, 0.5, 1, 255);
                            obj.average = average
                            obj.patern1 = (average * a / b * this.traceIterationCount)
                            obj.patern2 = (average * b * this.traceIterationCount)
                            obj.patern3 = (average * (a * this.traceIterationCount))
                            obj.patern4 = ((average * a) % (a * this.traceIterationCount))

                            obj.patern5 = (obj.average * b * ca * this.traceIterationCount)
                            obj.patern6 = (average * ca / cb * this.traceIterationCount)
                            obj.patern7 = ((average * ca) / (Math.PI * this.traceIterationCount))
                            obj.patern8 = (average * cb * this.traceIterationCount)
                            obj.patern9 = ((obj.average * a) / (cb * a))
                            if (n === this.traceIterationCount) {
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
            this.killAnimation = requestAnimationFrame(drawTrace)
        }
    }
}
