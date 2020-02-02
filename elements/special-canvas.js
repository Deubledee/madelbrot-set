


import '@polymer/app-route/app-route';
import '@polymer/iron-pages/iron-pages';
import { html, PolymerElement } from '@polymer/polymer';
import { html as litHtml, render } from 'lit-html';
import '../elements/cms-dropdown-menu';
import { tracePath3d } from '../functions/3dtest';
import { fillPixels } from '../functions/pixels';
import { tracePath } from '../functions/trace';
/**
* ### special canvas
* 
- sets the canvas element.
* 
- starts and stops the animations.
*   
* ## Use the platform
*
* @customElement mandelbrot-set
* @polymer
* @appliesMixin IronScrollTargetBehavior
* @demo http://127.0.0.1:8081/demo
*/
class specialCanvas extends tracePath3d(fillPixels(tracePath(PolymerElement))) {
    static get template() {
        return html`
        <style>
        :host {
            color: var(--paper-grey-600);
        }
        .container {
            box-sizing: border-box;
            display: grid;
            grid-template-columns: [col1] auto [col2] 30%;
            grid-template-rows: auto ;
            grid-template-areas: 
                "canvas sidebar";    
            grid-gap: 5px;
        }
        .canvas-area {
            grid-area: canvas;
            justify-self: center;
        }

        .button-area {
            grid-area: sidebar;
        }  
        .colors{
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

        h3[show], 
        h4[show] {           
            z-index: 1;
            width: initial;
            height: initial;
            visibility: visible;
        }

        div[show]{           
            visibility: visible;
            width: 100%;   
            height: auto;  
        }
        
        div[sidebar][show]{
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 1px 1px 1px grey;
            height: 60vh;
            display: block;
            position: relative;
            z-index: 5;
        }       

        .menu-area{
           display: none
        }

         @media screen and (max-height: 400px){
           div[sidebar][show]{
             height: 100vh; 
           }
         }

        @media screen and (max-width: 1024px) {
            .container {
                box-sizing: border-box;
                display: grid;
                grid-template-columns: [col1] 20% [col2] 20% [col3] 20% [col4] 20% [col5] 20% [end];
                grid-template-areas: 
                ". . . . menu"
                ". . . sidebar sidebar"
                "canvas canvas canvas canvas canvas";
                grid-gap: 5px;
            }

            .menu-area{
                display: block;
                grid-area: menu;
            }

            .canvas-area {
                grid-row-start: 2;
                grid-column-start: 1;
            } 

            h3,
            h4 {
                z-index: -1;
                visibility: collapse;
                width: 0px;   
                height: 0px;   
            }

            .colors {
                display: grid;
                grid-template-columns:[coll1] 20% [coll2] 20% [coll3] 20%;
                justify-content: space-around;
                z-index: -1;
                visibility: collapse;
                width: 0px;   
                height: 0px;  
            }        

        }

        @media screen and (max-width: 800px) {
            .container {
                grid-template-areas: 
                ". . . . menu"
                ". . sidebar sidebar sidebar"
                "canvas canvas canvas canvas canvas";
            }
        }

        @media screen and (max-width: 600px) {
            .container {
                grid-template-areas:
                    ". . . . menu"
                    "sidebar sidebar sidebar sidebar sidebar"
                    "canvas canvas canvas canvas canvas";
            }  

            h3[show] {
                letter-spacing: 1px;
            }
        }

        </style>       
        <app-route route="{{route}}" pattern="/:method" data="{{routeData}}" tail="{{subRoute}}" query-params="{{query}}" active="[[active]]">
        </app-route> 
        <div class="container">

            <dom-if if="[[view]]">
                <template>

                    <div class="menu-area">
                        <paper-button on-click="_show">
                            colors
                        </paper-button>
                    </div>

                    <div canvas show$="[[show]]" class="canvas-area">
                        <slot name="canvas-slot"></slot>
                    </div>

                </template>                
            </dom-if>

            <dom-if if="[[!view]]">
                <template>

                    <div canvas show$="[[show]]" class="canvas-area">
                        <div show$="[[show]]"  class="">
                           alo 
                        </div>
                    </div>

                </template>                
            </dom-if>

            <iron-pages class="button-area" selected="[[page]]" attr-for-selected="name">              

                <div name="fillpixels" show$="[[show]]" sidebar>
                    <div show$="[[show]]" name="fillpixels" class="colors">
                        ${this.setPixelsHtml}  
                    </div>
                </div>
                <div  name="tracepath" show$="[[show]]" sidebar>    
                    <div show$="[[show]]" name="tracepath" class="colors">           
                        ${this.setTraceHtml}        
                    </div>
                </div>
                <div name="tracepath3d" show$="[[show]]" sidebar>
                    <div show$="[[show]]" name="tracepath3d" class="colors">
                        ${this.setTrace3dHtml}        
                    </div>      
                </div>
            <iron-pages>
        </div>

        `
    }
    static get is() { return 'mandelbrot-set' }
    static get properties() {
        return {
            /**
         * ## *`Canvas`* context (2d)
         *  - set by `_setCanvas` method
         */
            ctx: String,
            /**
         * ## *`Canvas` *dimentions 
         * ### width | height
         *  - gets set by parent element, after main template.
         * 
         */
            dimentions: {
                type: String,
                notify: true
            },
            /**
         * ## *`Dimention`* Width
         *  - computed value 
         *  - triggerd by dimentions.
         */
            width: {
                type: String,
                computed: '_computeWidth(dimentions)'
            },
            /**
         * ## *`Dimention`* height
         *  - computed value 
         *  - triggerd by dimentions.
         */
            height: {
                type: String,
                computed: '_computeHeight(dimentions)'
            },
            /**
         * ## *`Animations`* state property
         * - when 'false', the runing animation cancels it's Animation Frame request.
         *
         */
            stop: {
                type: Boolean,
                value: false,
            },
            /**
         * ## *`Mobile`* menu toggler
         * - reflects to attribute in 'css'
         * 
         */
            show: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            /**
         * ##  *`Canvas`* setter
         * - when true
         * - triggerd by parent element
         * - observed by `_setCanvas` method
         */
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
            '_runMethod(routeData.method, route.__queryParams.state, route.path, setcanvas)'
        ];
    }
    /**
    *  ## *`Polymer`* custom `constructor` call
    *
    */
    ready() {
        super.ready()
    }

    /**
     ## *`mobile menu`* toggler    
    * 
    *  - sets the *show* property to i'ts oposite value
    * 
    */
    _show() {
        this.show = !this.show
    }
    /**
    *  ## *`Router`* view change checker.
    * 
    * 
    * 
    *  ### method `string | null | undefined`
    *  ##### which animation to be played.
    *  - hostname.domain/play/{String}.
    *  - {String} === animation to play.
    * 
    * 
    * 
    * ### state `string | null | undefined`
    *  ##### view check.
    *  - hostname.domain/{String}.
    *  - {String} === home | play.
    * 
    * 
    * 
    * ### setcanvas `boolean | null | undefined`
    *  ##### to play or not to play.
    *  - hostname.domain/play/{method}?state={String}.
    *  - {String} === null | start | stop.
    * 
    * 
    * 
    * ### view `string | null | undefined`
    *  ##### changed when dimentions change.
    *  - triggerd by parent's _resetCanvas method.    
    * 
    *        
    *   
    *  ## instaces
    * 
    *  
    * 
    *  @param method `String`: *`routeData.method`*.
    *  @param state `String:` *`route.__queryParams.state`*.
    *  @param view `String`: *`route.path`*.
    */
    _runMethod(method, state, view, setcanvas) {
        this.state = state
        this.view = view
        if (!!setcanvas) {
            if (this.state === 'stop') {
                this._stopAniamtion(this.state === 'stop');
                this.page = method
                return
            }
            if (this.state === 'null' && !view) {
                this._resetAniamtion(this.state === 'null');
                this.page = 'home';
                return
            }
            if (method === 'fillpixels') {
                this.page = method
                this._resetAniamtion(this.state === 'null')
                if (this.state === 'start') {
                    this.startPixelsAnimation(this.ctx, this.canvas.width, this.canvas.height, this.iterationCount, this.averageLimit)
                }
            }
            if (method === 'tracepath') {
                this.page = method
                this._resetAniamtion(this.state === 'null')
                if (this.state === 'start') {
                    this.startTraceAniamtion(this.ctx, this.canvas.width, this.canvas.height, this.iterationCount, this.averageLimit)
                }
            }
            if (method === 'tracepath3d') {
                this.page = method
                this._resetAniamtion(this.state === 'null')
                if (this.state === 'start') {
                    this.startTrace3dAniamtion(this.ctx, this.canvas.width, this.canvas.height, this.iterationCount, this.averageLimit)
                }
            }
        }
    }
    /**
    *  ## *`Canvas`* setter method
    * - creates the Context (2d)
    * - sets width and height to the *Canvas* element
    */
    _setCanvas(data) {
        if (!!data) {
            let canvasContainer = document.querySelector('#canvas')
            const canvasTemplate = () => litHtml`<canvas></canvas>`
            render(canvasTemplate(), canvasContainer)
            this.set('canvas', canvasContainer.children[0])
            this.canvas.width = this.width || '600'
            this.canvas.height = this.height || '600'
            this.ctx = this.canvas.getContext('2d')
            setTimeout(() => {
                if (this.state !== 'start') {
                    this.ctx.fillStyle = 'black';
                    this._setIntro()
                }
            }, 60);
        }
    }
    /**
    *  ## *`Dimentions`* setter 
    *   ### width
    * - parses the dimentions property and returns the width value
    * 
    */
    _computeWidth(dimentions) {
        try { dimentions.split(',')[0] } catch (err) {
            return 0
        }
        return dimentions.split(',')[0]
    }
    /**
    *  ## *`Dimentions`* setter 
    *   ### height
    * - parses the dimentions property and returns the height value
    *
    */
    _computeHeight(dimentions) {
        try { dimentions.split(',')[1] } catch (err) {
            return 0
        }
        return dimentions.split(',')[1]
    }
    /**
    *  ## *`Animations`* stop method
    *   - sets the stop property to true
    *   - triggerd by the router method
    */
    _stopAniamtion(stop) {
        if (!!stop) {
            this.stop = stop
            window.onbeforeunload = function () { }
        }
    }
    /**
    *  ## *`Animations`* re-setter    
    *   - changes stop to true
    *   - cals _setIntro
    *
    */
    _resetAniamtion(stop) {
        if (!!stop) {
            this.stop = stop
            // afterNextRender(this, () => {
            this._setIntro()
            window.onbeforeunload = function () { }
            // })
        }
    }
    /**
    *  ## *`Canvas`* *intro* placer
    *   
    *   - places the intro pattern into the canvas. 
    *
    */
    _setIntro() {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                this.ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' +
                    Math.floor(255 - 42.5 * j) + ',' + Math.floor(255 - 42.5 * i) + ')';
                this.ctx.fillRect(j * (this.height * 0.10), i * (this.height * 0.05), this.width, this.height);
            }
        }
    }
    /**
    *  ## *`Axis`* mapper
    * - returns a point value 'X' or `Y` within an area "width/height", to another area  "width/height"
    *  ### ex: 
    *  - x = _map(120, 0, 800, 0, 400);
    *  - y = _map(200, 0, 600, 0, 300);
    * 
    */
    _map(value, start, stop, start2, stop2) {
        var result = (value - start) / (stop - start) * (stop2 - start2) + start2;
        return result
    }
}

customElements.define('special-canvas', specialCanvas);
