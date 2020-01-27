
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
            grid-template-rows: [row1] 100px [row2] 45px [row3] 45px [row4] auto [row5] auto [row6] auto;
            padding: 10px;
            grid-template-areas: 
                "header"
                "links"
                "methods"
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
        }  

        .second1 {
            grid-area: methods;
        }

        .first, 
        .second1 {
            display: grid;
            grid-template-columns: 25% 25% 25% 25%;
        }

        .second2 {
            grid-area: buttons;
        }

        .third {
            grid-area: main; 
        }
        footer{            
            grid-area: footer;
            justify-self: center;
        }

        ::slotted(div[id=buttons]){
            display: grid;
            grid-template-columns: 33.25% 33.25% auto ;
        }

        ::slotted(div[title=button2]) {
            justify-self: start;
        }
        
        ::slotted(li) {
            list-style: none;
        } 
        </style>
        <app-location route="{{route}}">
        </app-location>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subRoute}}" query-params="{{query}}">
        </app-route>

        <div id='container'>
            <h2 class="strech">The Mandelbrot set By Deubledee</h2>

            <nav  class="first"> 
                <slot name="anchors">
                </slot>
            </nav>

            <dom-if if="[[play]]">
                <template>
                    <nav class="second1">
                       <slot name="methods"></slot>
                    </nav>
                </template>    
            </dom-if>            

            <dom-if if="[[method]]">
                <template>                
                    <nav class="second2">
                       <slot name="buttons"></slot>
                    </nav>
                </template>    
            </dom-if>
            
            <div class='third'>
                <iron-pages selected="[[page]]" attr-for-selected="name">
                    <div name="home">
                        <slot name="home">
                        </slot>
                    </div>

                    <special-canvas name="play" setcanvas="[[setCanvas]]" dimentions="[[dimentions]]" route="[[subRoute]]">
                        <slot slot="canvas-slot" name="canvas">
                        </slot>
                    </special-canvas>
                </iron-pages>
            </div>
            <footer>
                <slot name="footer">
                </slot>
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
            '_routePageChanged(routeData.page, subRoute.path)'
        ];
    }
    ready() {
        super.ready()
        this._setSloted()
    }
    _getWitdh(set) {
        if (!!set) {
            let str = `${(window.innerWidth * 0.661111111111111) / 1.2}, ${(window.innerWidth * 0.661111111111111) / 1.2}`
            return str
        }
    }
    _routePageChanged(page, method) {
        if (page === 'play') {
            this.play = (page === 'play')
            this.method = method
            this.page = page
            if (!this.setCanvas) {
                afterNextRender(this, () => {
                    this.setCanvas = true
                    this._setSlotedButtons()
                })
            }
            if (!!this.setCanvas)
                afterNextRender(this, () => {
                    this._setSlotedButtons()
                })

        }
        if (!page || page === 'home') {
            this.play = this.method = false
            this.page = 'home'
        }
    }
    _setSlotedButtons() {
        const buttonsTemplate = () => litHtml`  
                <div title="button1">
                    <paper-button>
                        <special-anchor type="button" .href="${this.rootPath}play${this.method}?state=start" text="Start">
                        </special-anchor>
                    </paper-button>
                </div>
                <div title="button2">
                    <paper-button>
                        <special-anchor type="button" .href="${this.rootPath}play${this.method}?state=stop" text="Stop">
                        </special-anchor>
                    </paper-button>
                </div>`
        render(buttonsTemplate(), document.querySelector('#buttons'))
    }
    _setSloted() {
        const canvasTemplate = () => litHtml`   

                <section slot="methods">
                    <special-anchor unresolved href="${this.rootPath}play/fillpixels?state=null" text="Fill Pixels">
                    </special-anchor>
                </section>
                <section slot="methods">
                    <special-anchor unresolved href="${this.rootPath}play/tracepath?state=null" text="Trace Path">
                    </special-anchor>
                </section>
                <section slot="methods">
                    <special-anchor unresolved href="${this.rootPath}play/tracepath3d?state=null" text="Trace Path 3d">
                    </special-anchor>
                </section>

                <section slot="anchors">
                    <special-anchor unresolved href="${this.rootPath}home?state=null" text="Home">
                    </special-anchor>
                </section>
                <section slot="anchors">
                    <special-anchor unresolved href="${this.rootPath}play?state=null" text="Play">
                    </special-anchor>
                </section>

                <h3 slot="home"> The Mandelbrot set with CANVAS </h3>
                <ul slot="home">
                    <li> by Deubledee </li>
                    <li> about the project </li>
                    <li> source code </li>
                </ul>

                <div id="buttons" slot="buttons">
                </div>

                <div id="canvas" slot="canvas"> 
                </div>
                
                <ul slot="footer"> 
                    <li> by Deubledee </li>
                    <li> about the project </li>
                    <li>  source code </li>
                </ul>
                `
        render(canvasTemplate(), this)
    }
}

customElements.define(mandelbrotSet.is, mandelbrotSet);