
import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import '@polymer/iron-pages/iron-pages';
import '@polymer/paper-button';
import { html, PolymerElement } from '@polymer/polymer';
import { html as litHtml, render } from 'lit-html';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import './elements/special-anchor';
import './elements/special-canvas';

class mandelbrotSet extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
            color: blue
        }
        #container {
            box-sizing: border-box;
            display: grid;
            grid-template-columns: [col2] auto;
            grid-template-rows: [row1] 100px [row2] 150px [row3] 100px [row4] auto [row4] 100px;
            padding: 10px;
            grid-template-areas: 
                "header"
                "links"
                "buttons"
                "main"
                "footer";       
            grid-gap: 10px;
        }

        .strech {
            grid-area: header; 
            box-sizing: border-box;
            padding: 20px;
            background-color: rgb(234, 240, 243);
            color: cadetblue;
            text-align: center;
        }
        .first {
            grid-area: links;
            display: grid;
            grid-template-columns: 33.25% 33.25% 33.25%;
        }
        .second {
            grid-area: buttons;
            display: grid;
            grid-template-columns: 50% 50%;
        }

        .third {
            grid-area: main; 
            height: 600px;
        }
        footer{            
            grid-area: footer;
            justify-self: center;
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
        <app-location route="{{route}}">
        </app-location>
        <app-route route="{{route}}" pattern="/:method" data="{{routeData}}" tail="{{subRoute}}" query-params="{{query}}">
        </app-route>

        <div id='container'>
            <h2 class="strech">The Mandelbrot set By Deubledee</h2>
            <nav  class="first"> 
                <slot name="anchors">
                </slot>
            </nav>
            <dom-if if="[[method]]">
                <template>
                    <nav class="second">
                        <div  class="button1">
                            <paper-button title="start">
                                <special-anchor type="button" href="[[rootPath]][[method]]?state=start" text="Start">
                                </special-anchor>
                            </paper-button>
                        </div>
                        <div class="button2">            
                            <paper-button title="stop">
                                <special-anchor type="button" href="[[rootPath]][[method]]?state=stop" text="Stop">
                                </special-anchor>
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
                            <li> by Deubledee </li>
                            <li> about the project </li>
                            <li> source code </li>
                        </ul>
                    </div>
                    <special-canvas name="methods" setcanvas="[[setCanvas]]" dimentions="[[dimentions]]" route="[[route]]">
                        <slot slot="canvas-slot" name="canvas">
                        </slot>
                    </special-canvas>
                </iron-pages>
            </div>
            <footer>
                <ul>
                    <li> by Deubledee </li>
                    <li> about the project </li>
                    <li>  source code </li>
                </ul>
            </footer>
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
            },
            setCanvas: {
                type: Boolean,
                value: false,
                notify: true
            },
            dimentions: {
                type: String,
                computed: '_getWitdh(setCanvas)',
            }
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData.method)'
        ];
    }
    ready() {
        super.ready()
        this._setSloted()
    }
    _getWitdh(set) {
        if (!!set) {
            let str = `${window.innerWidth * 0.661111111111111}, 600`
            return str
        }
    }
    _routePageChanged(method) {
        if (method !== 'home') {
            this.method = method
            this.page = 'methods'
            if (!this.setCanvas) {
                afterNextRender(this, () => {
                    this.setCanvas = true
                    //console.log(this.setCanvas)
                })
            }
        }
        if (!method || method === 'home') {
            this.method = false
            this.page = 'home'
        }
    }
    _setSloted() {
        const canvasTemplate = () => litHtml`
                <section slot="anchors">
                    <special-anchor unresolved href="${this.rootPath}home?state=null" text="Home">
                    </special-anchor>
                </section>
                <section slot="anchors">
                    <special-anchor unresolved href="${this.rootPath}pixels?state=null" text="Pixels">
                    </special-anchor>
                </section>
                <section slot="anchors">
                    <special-anchor unresolved href="${this.rootPath}path?state=null" text="Path">
                    </special-anchor>
                </section>
                <div id="canvas" slot="canvas"> 
                </div>`
        render(canvasTemplate(), this)
    }
}

customElements.define(mandelbrotSet.is, mandelbrotSet);
