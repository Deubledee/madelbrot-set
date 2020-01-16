


import '@polymer/app-route/app-route';
import '@polymer/iron-pages/iron-pages';
import { html, PolymerElement } from '@polymer/polymer';
import { html as litHtml, render } from 'lit-html';
import { fillPixels } from '../functions/pixels';
import { tracePath } from '../functions/trace';
import { tracePath3d } from '../functions/3dtest';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '../elements/cms-dropdown-menu';
class specialCanvas extends tracePath3d(fillPixels(tracePath(PolymerElement))) {
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
        .pixels{
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
        </style>       
        <app-route route="{{route}}" pattern="/:method" data="{{routeData}}" tail="{{subRoute}}" query-params="{{query}}">
        </app-route> 
        <div class="container">
            <div class="canvas-area">
                <slot name="canvas-slot"></slot>
            </div>

            <iron-pages class="button-area" selected="[[page]]" attr-for-selected="name">
                <div name="fillpixels" class="pixels">
                    ${this.setPixelsHtml}  
                </div>
                <div name="tracepath" class="pixels">            
                    ${this.setTraceHtml}        
                </div>
                <div name="tracepath3d" class="pixels">
                    ${this.setTrace3dHtml}        
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

            stop: {
                type: Boolean,
                value: false,
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
            'runMethod(routeData.method, query.state, setcanvas)'
        ];
    }
    ready() {
        super.ready()
    }
    runMethod(method, state, setcanvas) {
        this.state = state
        if (!!setcanvas) {
            if (this.state === 'stop') { this.stopAniamtion(this.state === 'stop'); return }
            if (this.state === 'null' && ['fillpixels', 'tracepath', 'tracepath3d'].indexOf(method) === -1) { this.resetAniamtion(this.state === 'null'); return }
            if (method === 'fillpixels') {
                this.page = method
                this.resetAniamtion(this.state === 'null')
                if (this.state === 'start') {
                    this.startPixelsAnimation(this.ctx, this.canvas.width, this.canvas.height, this.iterationCount, this.averageLimit)
                }
            }
            if (method === 'tracepath') {
                this.page = method
                this.resetAniamtion(this.state === 'null')
                if (this.state === 'start') {
                    this.startTraceAniamtion(this.ctx, this.canvas.width, this.canvas.height, this.iterationCount, this.averageLimit)
                }
            }
            if (method === 'tracepath3d') {
                this.page = method
                this.resetAniamtion(this.state === 'null')
                if (this.state === 'start') {
                    this.startTrace3dAniamtion(this.ctx, this.canvas.width, this.canvas.height, this.iterationCount, this.averageLimit)
                }
            }

        } else if (method === 'fillpixels' || method === 'tracepath' || method === 'tracepath3d') {
            this.page = method
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
                if (this.state !== 'start') {
                    this.ctx.fillStyle = 'black';
                    this.setIntro()
                }
            }, 60);
        }
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
            window.onbeforeunload = function () { }
        }
    }
    resetAniamtion(stop) {
        if (!!stop) {
            this.stop = stop
            // afterNextRender(this, () => {
            this.setIntro()
            window.onbeforeunload = function () { }
            // })
        }
    }
    setIntro() {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                this.ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' +
                    Math.floor(255 - 42.5 * j) + ',' + Math.floor(255 - 42.5 * i) + ')';
                this.ctx.fillRect(j * (this.height * 0.10), i * (this.height * 0.05), this.width, this.height);
            }
        }
    }
    map(value, start, stop, start2, stop2) {
        var result = (value - start) / (stop - start) * (stop2 - start2) + start2;
        return result
    }
}

customElements.define('special-canvas', specialCanvas);
