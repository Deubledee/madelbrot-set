


import '@polymer/app-route/app-route';
import '@polymer/iron-pages/iron-pages';
import { html, PolymerElement } from '@polymer/polymer';
import { html as litHtml, render } from 'lit-html';
import { fillPixels } from '../functions/pixels';
import { tracePath } from '../functions/trace';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '../elements/cms-dropdown-menu';
class specialCanvas extends fillPixels(tracePath(PolymerElement)) {
    static get template() {
        return html`
        <style>
        :host {
            color: blue
        }
        .container {
            box-sizing: border-box;
            display: grid;
            grid-template-columns: [col1] auto [col2] 30% [end];
            grid-template-rows: auto ;
            grid-template-areas: 
                "canvas sidebar";    
            grid-gap: 5px;
        }
        .canvas-area {
            grid-area: canvas; 
        }
        .button-area {
            grid-area: sidebar;
        }        
        div[title=pixels]{
            display: grid;
            grid-template-columns: [coll1] 30% [coll2] 30% [coll3] 30%;
            grid-template-rows: [row1] auto ;
            grid-template-areas: 
                "title title title"
                "title2 title2 title2"  
                "red green blue"  
                "title3 title3 title3"
                "red2 green2 blue2";    
            align-items: center;
        } 
        .pixels1 {
            grid-area: red; 
        }
        .pixels2 {
            grid-area: green; 
        }
        .pixels3 {
            grid-area: blue; 
        }

        h3 {
            grid-area: title;
            text-align: center
        }

        .h41 {
            grid-area: title2;
            text-align: center
        }        
        .h42 {
            grid-area: title3;
            text-align: center
        }

        div[title=path]{
            display: grid;
            grid-template-columns: 33.25% 33.25% 33.25%;
            grid-template-rows: auto ;
            grid-template-areas: 
                "canvas sidebar";       
            align-items: center;
            grid-gap: 5px;
        } 

        </style>       
        <app-route route="{{route}}" pattern="/:method" data="{{routeData}}" tail="{{subRoute}}" query-params="{{query}}">
        </app-route> 
        <div class="container">
            <div class="canvas-area">
                <slot name="canvas-slot"></slot>
            </div>

            <iron-pages class="button-area" selected="[[page]]" attr-for-selected="name">
                <div name="pixels" title="pixels">
                    <h3> color values </h3>                    
                    <h4 class="h41"> within limit </h4>
                    <div class="pixels1">   
                        <cms-dropdown-menu 
                            items="[[mdColorsRed]]"  
                            horizontal-align="left" 
                            vertical-align="top" 
                            scroll-action="refit"
                            res="{{mdResponse}}">            
                        </cms-dropdown-menu> 
                    </div>
                    <div class="pixels2">    
                        <cms-dropdown-menu 
                            items="[[mdColorsGreen]]"  
                            horizontal-align="left" 
                            vertical-align="top" 
                            scroll-action="refit"
                            res="{{mdResponse}}">            
                        </cms-dropdown-menu> 
                    </div>
                    <div class="pixels3">   
                        <cms-dropdown-menu 
                            items="[[mdColorsBlue]]"  
                            horizontal-align="left" 
                            vertical-align="top" 
                            scroll-action="refit"
                            res="{{mdResponse}}">            
                        </cms-dropdown-menu> 
                    </div>      

                    <h4 class="h42"> out of limit </h4>   

                    <div class="path">     
                        <cms-dropdown-menu 
                            items="[[nmdColorsRed]]"  
                            horizontal-align="left" 
                            vertical-align="top" 
                            scroll-action="refit"
                            res="{{nmdResponse}}">            
                        </cms-dropdown-menu> 
                    </div>
                    <div class="path1">     
                        <cms-dropdown-menu 
                            items="[[nmdColorsGreen]]"  
                            horizontal-align="left" 
                            vertical-align="top" 
                            scroll-action="refit"
                            res="{{nmdResponse}}">            
                        </cms-dropdown-menu> 
                    </div>
                    <div class="path2"> 
                        <cms-dropdown-menu 
                            items="[[nmdColorsBlue]]"  
                            horizontal-align="left" 
                            vertical-align="top" 
                            scroll-action="refit"
                            res="{{nmdResponse}}">            
                        </cms-dropdown-menu> 
                    </div>   
                </div>
                <div class="button-area" name="path" title="path">
                    
                </div>
            <iron-pages>
        </div>

        `
    }
    static get is() { return 'mandelbrot-set' }
    static get properties() {
        return {
            ctx: String,
            dimentions: {
                type: String,
                notify: true
            },
            width: {
                type: String,
                computed: 'computeWidth(dimentions)'
            },
            height: {
                type: String,
                computed: 'computeHeight(dimentions)'
            },
            mdColorsRed: {
                type: Array,
                notify: true,
                computed: 'setColorsAndPaterns(dimentions,"red")'
            },
            mdColorsGreen: {
                type: Array,
                notify: true,
                computed: 'setColorsAndPaterns(dimentions,"green")'
            },
            mdColorsBlue: {
                type: Array,
                notify: true,
                computed: 'setColorsAndPaterns(dimentions,"blue")'
            },
            nmdColorsRed: {
                type: Array,
                notify: true,
                computed: 'setColorsAndPaterns(dimentions,"red")'
            },
            nmdColorsGreen: {
                type: Array,
                notify: true,
                computed: 'setColorsAndPaterns(dimentions,"green")'
            },
            nmdColorsBlue: {
                type: Array,
                notify: true,
                computed: 'setColorsAndPaterns(dimentions,"blue")'
            },
            mdResponse: {
                type: Object,
                notify: true,
                observer: '_setMdPattern'
            },
            nmdResponse: {
                type: Object,
                notify: true,
                observer: '_setNmdPattern'
            },
            minval: {
                type: Number,
                value: -1.5
            },
            maxval: {
                type: Number,
                value: 1.5,
            },
            stop: {
                type: Boolean,
                value: false,
            },
            scaleValue: {
                type: Number,
                value: 1,
            },
            iterationCount: {
                type: Number,
                value: 150,
            },
            limit: {
                type: Number,
                value: 16
            },
            setcanvas: {
                type: Boolean,
                value: false,
                notify: true,
                observer: '_setCanvas'
            }
        }
    }

    static get observers() {
        return [
            'runMethod(routeData, query.state)'
        ];
    }
    ready() {
        super.ready()
    }
    setColorsAndPaterns(stop, color) {
        if (!!stop) {
            let arr = [], obj1 = {}, obj2 = {}
            obj1[color] = ''
            obj2.items = [
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
                'patern12'
            ]
            arr.push(obj1)
            arr.push(obj2)
            return arr
        }
    }
    runMethod(routeData, state) {
        if (!!this.setcanvas) {
            this.state = state
            if (this.state === 'stop') {
                this.stopAniamtion(this.state === 'stop');
                return
            }
            //   if (this.state === 'null') { this.resetAniamtion(this.state === 'null'); return }
            if (routeData.method === 'pixels') {
                this.page = routeData.method
                this.resetAniamtion(this.state === 'null')
                if (this.state === 'start') {
                    this.startPixelsAnimation(this.ctx, this.canvas.width, this.canvas.height, this.iterationCount, this.averageLimit)
                }
            }
            if (routeData.method === 'path') {
                this.page = routeData.method
                this.resetAniamtion(this.state === 'null')
                if (this.state === 'start') {
                    this.startTraceAniamtion(this.ctx, this.canvas.width, this.canvas.height, this.iterationCount, this.averageLimit)
                }
            }
        } else if (routeData.method === 'pixels' || routeData.method === 'path') {
            this.page = routeData.method
        }
    }
    _setCanvas(data) {
        if (!!data) {
            let mandelbrotSet = document.querySelector('#canvas')
            const canvasTemplate = () => litHtml`<canvas></canvas>`
            render(canvasTemplate(), mandelbrotSet)
            this.set('canvas', mandelbrotSet.children[0])
            this.canvas.width = this.width || '600'
            this.canvas.height = this.height || '600'
            this.ctx = this.canvas.getContext('2d')
            setTimeout(() => {
                this.ctx.fillStyle = 'black';
                this.ctx.fillRect(0, 0, this.width, this.height);
                console.log('set canvas', this.stop)
            }, 60);
        }
    }
    _setMdPattern(data) {
        console.log(data);
        let par = Object.keys(data).pop()
        this.mdColors[par] = data[par]
    }
    _setNmdPattern(data) {
        console.log(data);
        let par = Object.keys(data).pop()
        this.nmdColors[par] = data[par]
    }
    computeWidth(dimentions) {
        return dimentions.split(',')[0]
    }
    computeHeight(dimentions) {
        return dimentions.split(',')[1]
    }
    stopAniamtion(stop) {
        if (!!stop) {
            this.stop = stop
        }
    }
    resetAniamtion(stop) {
        if (!!stop) {
            this.stop = stop
            afterNextRender(this, () => {
                for (var i = 0; i < 6; i++) {
                    for (var j = 0; j < 6; j++) {
                        this.ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' +
                            Math.floor(255 - 42.5 * j) + ',' + Math.floor(255 - 42.5 * i) + ')';
                        this.ctx.fillRect(j * (this.height * 0.10), i * (this.height * 0.05), this.width, this.height);
                    }
                }
            })
        }
    }
    map(value, start, stop, start2, stop2) {
        var result = (value - start) / (stop - start) * (stop2 - start2) + start2;
        return result
    }
}

customElements.define('special-canvas', specialCanvas);
