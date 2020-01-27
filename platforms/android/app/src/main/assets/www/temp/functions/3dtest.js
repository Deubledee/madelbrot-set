
import { html } from '@polymer/polymer';
import '../elements/cms-dropdown-menu';
export const tracePath3d = function (superClass) {
    return class extends superClass {

        static get setTrace3dHtml() {
            return html` 
            <h3>trace color values </h3>             
            <div>   
                <cms-dropdown-menu 
                    items="[[mdTrace3dColorsRed]]"  
                    horizontal-align="left" 
                    vertical-align="top" 
                    scroll-action="refit"
                    res="{{mdTrace3dResponse}}">            
                </cms-dropdown-menu> 
            </div>
            <div>    
                <cms-dropdown-menu 
                    items="[[mdTrace3dColorsGreen]]"  
                    horizontal-align="left" 
                    vertical-align="top" 
                    scroll-action="refit"
                    res="{{mdTrace3dResponse}}">            
                </cms-dropdown-menu> 
            </div>
            <div>   
                <cms-dropdown-menu 
                    items="[[mdTrace3dColorsBlue]]"  
                    horizontal-align="left" 
                    vertical-align="top" 
                    scroll-action="refit"
                    res="{{mdTrace3dResponse}}">            
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
                mdTrace3dColors: {
                    type: Object,
                    value: { red: "average", green: "patern3", blue: "average" }
                },
                nmdTrace3dColors: {
                    type: Object,
                    value: { red: "average", green: "patern3", blue: "average" }
                },
                mdTrace3dResponse: {
                    type: Object,
                    notify: true,
                    observer: '_setMdTrace3dPattern'
                },
                mdTrace3dColorsRed: {
                    type: Array,
                    notify: true,
                    computed: 'setTrace3dColorsAndPaterns(dimentions,"red")'
                },
                mdTrace3dColorsGreen: {
                    type: Array,
                    notify: true,
                    computed: 'setTrace3dColorsAndPaterns(dimentions,"green")'
                },
                mdTrace3dColorsBlue: {
                    type: Array,
                    notify: true,
                    computed: 'setTrace3dColorsAndPaterns(dimentions,"blue")'
                },
                trace3dMinval: {
                    type: Number,
                    value: -1.5
                },
                trace3dMaxval: {
                    type: Number,
                    value: 1.5,
                },
                trace3dScaleValue: {
                    type: Number,
                    value: 1,
                },
                trace3dIterationCount: {
                    type: Number,
                    value: 25,
                },
                trace3dLimit: {
                    type: Number,
                    value: 20
                },
                killAnimation: Number
            }
        }
        ready() {
            super.ready();
        }
        _setMdTrace3dPattern(data) {
            let color = Object.keys(data).pop()
            this.mdTrace3dColors[color] = data[color]
        }

        setTrace3dColorsAndPaterns(set, color) {
            if (!!set) {
                let arr = [], obj1 = {}, obj2 = {}
                obj1[color] = this.mdTrace3dColors[color]
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
        startTrace3dAniamtion(ctx, width, height) {
            window.onbeforeunload = function () {
                return 'playing?'
            }
            if (this.stop === false) {
                console.info('Trace3d started');
            }
            this.stop = false
            const obj = {}
            this.ctx.fillStyle = `rgb(200, 180, 200)`
            ctx.fillRect(0, 0, width, height)
            let drawTrace3d = () => {
                try {
                    if (this.stop === true) {
                        cancelAnimationFrame(this.killAnimation);
                        console.info('Trace3d stoped');
                        return
                    }
                    setTimeout(() => {
                        this.killAnimation = requestAnimationFrame(drawTrace3d)
                    }, 1000);
                    let XPosition = this.trace3dMinval,
                        YPosition = this.trace3dMaxval
                    let IMAGEDATA = ctx.getImageData(0, 0, width, height)
                    let pixels = IMAGEDATA.data
                    for (let x = 0; x < width; x++) {
                        this.ctx.beginPath();
                        for (let y = 0; y < height; y++) {
                            let a = this.map(x - 125, 0, width * this.trace3dScaleValue, XPosition, YPosition);
                            let b = this.map(y, 0, height * this.trace3dScaleValue, XPosition, YPosition);
                            let ca = a
                            let cb = b
                            let z
                            let n = 0;
                            while (n < this.trace3dIterationCount) {
                                let aa = a * a - b * b;
                                let bb = 2 * a * b;
                                a = aa + ca;
                                b = bb + cb;
                                z = a * a + b * b
                                if (z > this.trace3dLimit) {
                                    break;
                                }
                                n++;
                            }

                            obj.average = this.map(n, 0, this.trace3dIterationCount, 0, this.averageLimit);
                            obj.average = Math.random(1) * this.map(Math.sqrt(obj.average), 1, 0.5, 1, 255);
                            obj.patern1 = (obj.average * a / b * this.trace3dIterationCount)
                            obj.patern2 = ((obj.average * a) * (b * (Math.PI * this.trace3dIterationCount)))
                            obj.patern3 = (obj.average * (a * this.trace3dIterationCount))
                            obj.patern4 = (obj.average * cb * ca * a * (Math.PI * this.trace3dIterationCount)) * a

                            obj.patern5 = (obj.average * b * ca * this.trace3dIterationCount)
                            obj.patern6 = (obj.average * ca * ca * b * (Math.PI * this.trace3dIterationCount) * a)

                            obj.patern7 = ((obj.average * ca) * (cb * this.trace3dIterationCount) * (a * this.trace3dIterationCount)) * b

                            obj.patern8 = (obj.average * b * this.trace3dIterationCount)
                            obj.patern9 = ((obj.average * a) % ((a * this.trace3dIterationCount) * (a * this.trace3dIterationCount)))

                            if (n === this.trace3dIterationCount) {
                                ctx.moveTo((x + a), (y + b));
                                ctx.lineTo((x + a) + 1, (y + b));

                                ctx.lineTo((x + a) + 1, (y + z));
                                ctx.lineTo((x + z), (y + b));

                                ctx.lineTo((x + z) + 50, (y + z) + 5);
                                ctx.lineTo((x + z) - 50, (y + z) - 5);
                                ctx.lineTo((x + a), (y + b));
                                ctx.strokeStyle = `rgb(${obj[this.mdTrace3dColors.red]}, ${obj[this.mdTrace3dColors.green]}, ${obj[this.mdTrace3dColors.blue]})`;
                            }
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
            this.killAnimation = requestAnimationFrame(drawTrace3d)
        }
    }
}
