
import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-selector/iron-selector';
import '@polymer/paper-button';
import './elements/special-canvas';
import './elements/special-anchor';
import { tracePath } from './functions/trace';
import { fillPixels } from './functions/pixels';

class mandelbrotSet extends fillPixels(tracePath(PolymerElement)) {
    static get template() {
        return html`
        <style>
        :host {
            color: blue
        }
        #container {
            box-sizing: border-box;
            display: grid;
            grid-template-columns: auto;
            grid-template-rows: [row1-start] 50px [row1-end] 100px [third-line] auto [last-line];            
            align-items: center;
            grid-gap: 10px;
            padding: 15px;
        }

        .first {
            grid-row-start: 1;
            grid-auto-flow: column;
            display: grid;
        }
        .second {
            grid-row-start: 2;
            grid-auto-flow: column;
            display: grid;
            grid-template-columns: 50% 50%;
            justify-items: center;
           /* justify-self: center;*/
        }

        .third {
            grid-row-end: 4;
            height: 600px;
            justify-self: center;
        }

        .strech {
            box-sizing: border-box;
            padding: 20px;
            background-color: rgb(234, 240, 243);
            color: cadetblue;
            text-align: center;
        }
        .button1{
            justify-self: end;
        }
        .button2 {
            justify-self: start;
        }
        li {
            list-style: none;
        }
        img {
            max-height: 12px;
        }
        </style>
        <app-location route="{{route}}"></app-location>
        <app-route route="{{route}}" pattern="/:method" data="{{routeData}}" tail="{{subRoute}}" query-params="{{query}}"></app-route>

        <h2 class="strech">The Mandelbrot set By Deubledee</h2>
        <div id='container'>

            <nav class="first">
                <section>
                    <special-anchor unresolved href="[[rootPath]]home" text="Home"></special-anchor>
                </section>
                <section>
                    <special-anchor unresolved href="[[rootPath]]pixels?state=stop" text="Pixels"></special-anchor>
                </section>
                <section>   
                    <special-anchor unresolved href="[[rootPath]]path?state=stop" text="Path"></special-anchor>
                </section>  
            </nav>

            <dom-if if="[[method]]">
                <template>
                    <nav name="methods" class="second">
                        <div class="button1">
                            <paper-button title="start">
                            <special-anchor unresolved href="[[rootPath]][[method]]?state=start" text="Sart"></special-anchor>
                            </paper-button>
                        </div>
                        <div class="button2">            
                            <paper-button title="stop">
                            <special-anchor unresolved href="[[rootPath]][[method]]?state=stop" text="Stop"></special-anchor>
                            </paper-button>
                        </div>
                    </nav>
                </template>    
            </dom-if>
            <div class='third'>
                <iron-pages selected="[[page]]" attr-for-selected="name">
                    <div name="home">
                        <h3> The Mandelbrot set with CANVAS </h3>
                        <ul>
                            <li> about the project </li>
                            <li> by Deubledee </li>
                            <li> <img src="https://github.com/fluidicon.png"> github link </li>
                        </ul>
                    </div>
                    <special-canvas name="methods" dimentions="600, 600" execute="[[method]]" state="[[state]]">
                        <slot slot="canvas-slot" name="canvas">
                        </slot>
                    </special-canvas>
                </iron-pages>
            </div>

        </div>`}
    static get is() { return 'mandelbrot-set' }
    static get properties() {
        return {
            page: {
                type: String,
                notify: true,
                value: ''
            },
            method: {
                type: String,
                notify: true,
                value: ''
            }
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData.method, query)'
        ];
    }
    ready() {
        super.ready()
        //this.addEventListener('click', (this.defaultPreventAndRoute).bind(this))
    }
    _routePageChanged(method, query) {
        if (method !== 'home') {
            this.method = method
            // this.meth = true
            this.page = 'methods'
            console.log(method, query)
        }
        if (method === 'home') {
            this.method = false
            this.page = method
        }
    }
}

customElements.define(mandelbrotSet.is, mandelbrotSet);
