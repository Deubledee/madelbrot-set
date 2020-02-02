
import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/iron-pages/iron-pages';
import { IronScrollTargetBehavior } from '@polymer/iron-scroll-target-behavior/iron-scroll-target-behavior.js';
import '@polymer/paper-button';
import { html, PolymerElement } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { html as litHtml, render } from 'lit-html';
import './elements/special-anchor';
import './elements/special-canvas';
import './elements/image-slider';
/**
* ### Mandelbrot set 
* - is an app which shows the mandelbrot set in canvas and custom webComponents.
* - Based on 'code train'
* ## Use the platform  
* 
* @customElement mandelbrot-set
* @polymer
* @appliesMixin IronScrollTargetBehavior
* @demo http://127.0.0.1:8081/demo
*/
class mandelbrotSet extends mixinBehaviors(IronScrollTargetBehavior, PolymerElement) {
    static get template() {
        return html`
        <style>
        :host {
            color: var(--google-blue-300);
        }
        /*main grid*/
        #container {
            box-sizing: border-box;
            display: grid;
            grid-template-columns: [col1] auto;
            grid-template-rows: [row1] 52px [row2] 50px [row3] 100px [row4] auto [row5] auto [row6] auto;
            grid-template-areas: 
                "header"
                "links"
                "methods"
                "buttons"
                "main"
                "footer";    
        }
        /* top headder */
        .strech {            
            grid-area: header;
            box-sizing: border-box;
            margin-block-start: 0px;
            padding-block-start: 15px;
            padding-block-start: 15px;
            padding-block-end: 15px;
            padding-inline-start: 57px;
            height: 53px;
            z-index: 12;
            background-color: rgb(11, 19, 107);
            color: var(--light-theme-divider-color);
            /* text-align: center; */
            letter-spacing: 2px;
            box-shadow: 0px 0px 5px var(--primary-text-color);
        }
        /* page navogation */
        .first {
            grid-area: links;
            background-color: rgb(235, 241, 245);
        }  

        /* page navogation */

        .second1 {
            grid-area: methods;
            align-self: center;
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
            grid-template-columns: 33.25% 33.25% auto;
            justify-items: center;
        }

        ::slotted(div[title=button2]) {
            justify-self: start;
        }
        
        ::slotted(li) {
            list-style: none;
        } 

       .menu{
        display: none
       }

       .home-container {
            box-sizing: border-box;
            display: grid;
            grid-template-columns: [col1] auto [col2] auto [col3]  auto [col4] auto [col5] auto [col6] auto [end];
            grid-template-rows: [row1] auto [row2] auto;
                grid-template-areas:
                    ". . head head . ."
                    ". . content content . . ";
       }
        ::slotted(h3[title=home_header]){            
            grid-area: head;
        }

        ::slotted(div[title=home_content]) {
            grid-area: content;
        }

        @media screen and (max-width: 1024px) {
            #container {
                box-sizing: border-box;
                display: grid;
                grid-template-columns: [col1] 0px [col2] auto;
                grid-template-rows: [row1] auto [row2] auto [row3] 110px;
                padding: 10px;
                grid-template-areas:
                    "header header header"
                    "menu menu menu"
                    "links main main"
                    " methods main main"
                    " buttons buttons buttons"
                    "footer footer footer";
                grid-gap: 0px;  
            }
          
            .first, 
            .second1 {
                grid-template-columns: [col1] 115px;
                grid-template-rows: [row1] 50px [row2] 50px;
                z-index: 12;
                background-color: #ffffff;
                width: 180px;
            }

            .first {
                border-right: 1px solid var(--dark-theme-secondary-color);
                border-top: 1px solid var(--dark-theme-secondary-color);
                border-bottom: 1px solid var(--dark-theme-secondary-color);
            }  

            .second1 {
                height: 50vh;
                border-right: 1px solid var(--dark-theme-secondary-color);
                border-bottom: 1px solid var(--dark-theme-secondary-color);
                align-self: baseline;
            }

           .menu{
                grid-area: menu;
                display: grid;
                grid-template-columns: [col1] 50px [col2] 50px;
                grid-template-rows: [row1] auto;
           }

           ::slotted(div[id=buttons]){  
                grid-template-columns: [col1] 25% [col2] 25%;
                grid-template-rows: [row1] auto;
            }

            .first[closed] { 
                width: 0px; 
                z-index: -1;      
                visibility: collapse;

             }
 
            .second1[closed] { 
                width: 0px;           
                z-index: -1;
                visibility: collapse;
             }
        }
        </style>
        <app-location route="{{route}}">
        </app-location>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subRoute}}" query-params="{{query}}">
        </app-route>

        <iron-media-query query="(max-width: 1024px)" query-matches="{{mobile}}">
        </iron-media-query>

        <div id="container">
            <h2 id="header_md_set" class="strech" >The Mandelbrot set</h2>

            <nav class="menu" aria-labelledby="header_md_set"> 

                <paper-button on-click="_open" title="pages">
                    <iron-icon icon="menu" aria-label="pages" ></iron-icon>
                </paper-button>              

            </nav>

            <nav aria-labelledby="header_md_set" closed$="[[closed]]" class="first"> 
                <slot name="anchors">
                </slot>
            </nav>

            <dom-if if="[[play]]">
                <template>
                    <nav aria-labelledby="header_md_set" closed$="[[closed]]" class="second1">
                       <slot name="methods"></slot>
                    </nav>
                </template>    
            </dom-if>            

            <dom-if if="[[method]]">
                <template>                
                    <nav aria-labelledby="header_md_set" class="second2">
                       <slot name="buttons"></slot>
                    </nav>
                </template>    
            </dom-if>
            
            <div aria-labelledby="header_md_set" class='third'>
                <iron-pages selected="[[page]]" attr-for-selected="name">
                    <div class="home-container" name="home">
                        <slot name="home">
                        </slot>
                    </div>

                    <special-canvas id="canvas" aria-label="canvas" name="play" setcanvas="[[setCanvas]]" dimentions="[[dimentions]]" route="[[subRoute]]">
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
            /** 
             * ## *`View`* change property.
             * - triggers the view change in '<iron-pages>'
             */
            page: {
                type: String,
                notify: true,
                value: ''
            },
            /**
             * 
             * ## *`View port`*  property 
             * - Observed.
             * 
             * */
            mobile: {
                type: Boolean,
                notify: true
            },
            /** 
             * 
             *  ## *`Canvas`* active animation.
             * 
             */
            method: {
                type: String,
                notify: true,
                value: ''
            },
            /** 
             * 
             * ## *`sidebar`* Toggler 
             * - whem in mobile view set to true.
             * 
             **/
            closed: {
                type: Boolean,
                value: true,
                reflectToAttribute: true
            },
            /** 
             * 
             * ## `Canvas` slotting and setting trigger
             * - triggers computed 'dimentions' value
             * 
             */
            setCanvas: {
                type: Boolean,
                value: false,
                notify: true
            },
            /** 
             * 
             * ## *`Canvas`* dimentions `width`, `height`. 
             * - Value 'string' is 'computed', triggerd by 'setCanvas
             * 
             */
            dimentions: {
                type: String,
                computed: '_getWitdh(setCanvas)',
            },
            /** 
             * 
             *  ## *`Slider`* *image* Array. 
             *  - Each image is a 'object' with 'url' and 'text' properties.
             * 
             */
            images: {
                type: Array,
                notify: true,
                value: [{
                    url: 'images/mand-img-01.png',
                    text: "Hi! \n I'm piece of text..."
                }, {
                    url: 'images/mand-img-02.png',
                    text: "Hi! \n I'm piece of text..."
                }, {
                    url: 'images/mand-img-03.png',
                    text: "Hi! \n I'm piece of text..."
                }, {
                    url: 'images/mand-img-04.png',
                    text: "Hi! \n I'm piece of text..."
                }, {
                    url: 'images/mand-img-05.png',
                    text: "Hi! \n I'm piece of text..."
                }, {
                    url: 'images/mand-img-06.png',
                    text: "Hi! \n I'm piece of text..."
                },]
            }
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData.page, subRoute.path)'
        ];
    }
    /**
    *  ## `Polymer` custom `constructor` call
    *
    */
    ready() {
        super.ready()
        this._setSloted()
        window.addEventListener('resize', (this._resetCanvas).bind(this))
    }

    /**
    *  ## *`Sidebar`* toggler
    *   
    */
    _open() {
        this.closed = !this.closed
    }

    /**
    * ## *`Canvas`* resizer 
    * 
    * - resizes the `Canvas`  
    * - Responsive.
    * 
    * 
    * 
    * 
    * ### query `object | null | undefined`
    *  - set by app-route url search arguments.
    * 
    *  
    * 
    *  
    * ### state `string | null | undefined`
    *   - canvas runnig methods state
    *       - start 
    *       - stop
    * 
    *  
    *    
    * ### setCanvas `boolean | null | undefined` 
    *  - trigger to reset <special-canvas>
    * 
    */
    _resetCanvas() {
        this.state = this.query.state
        if (this.state === `start`) {
            window.history.pushState({}, null, window.location.pathname + '?state=stop')
            window.dispatchEvent(new CustomEvent('location-changed'));
        }
        this.setCanvas = false
        afterNextRender(this, () => {
            let time = setTimeout(() => {
                window.history.pushState({}, null, `${window.location.pathname}?state=${this.state}`)
                window.dispatchEvent(new CustomEvent('location-changed'));
                this.setCanvas = true
                clearTimeout(time)
            }, 500);
        })
    }
    /**
    * ## *`Dimentions`* creater 
    *  - returns `Canvas` dimentions.
    *
    * @param {Boolean} setCanvas when set to true computes values accordind to screen.    
    * 
    */
    _getWitdh(setCanvas) {
        if (!!setCanvas) {
            if (!!this.mobile) {
                let str = `${window.innerWidth - 40}, ${window.innerWidth - 40}`
                return str
            }
            let str = `${(window.innerWidth * 0.661111111111111) / 1.2}, ${(window.innerWidth * 0.661111111111111) / 1.2}`
            return str
        }

    }
    /**
    * ## *`Router`* view change checker.
    * 
    * -- gets arguments *routeData.page* and *subRoute.path* 
    * triggerd by the *observers* static method. --      
    * @param {String} method shows the `play` `stop` buttons, when in a `method` view.   
    * @param {String} page `home` or `play` viewes.
    *
    */
    _routePageChanged(page, method) {
        if (page === `play`) {
            this.play = (page === `play`)
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
    /**
    * ## `*Template`* slotter 
    * - slots the `play` and `stop` buttons.
    * - trigerd by `routePageChanged` method. 
    * #### !flat content
    * 
    */
    _setSlotedButtons() {
        const buttonsTemplate = () => litHtml`  
                <div title="button1">
                    <paper-button aria-label="start">
                        <special-anchor type="button" .href="${this.rootPath}play${this.method}?state=start" text="Start">
                        </special-anchor>
                    </paper-button>
                </div>
                <div title="button2">
                    <paper-button aria-label="stop">
                        <special-anchor type="button" .href="${this.rootPath}play${this.method}?state=stop" text="Stop">
                        </special-anchor>
                    </paper-button>
                </div>`
        render(buttonsTemplate(), document.querySelector('#buttons'))
    }

    /**
    * ## *`Template`* slotter
    * - slots the `main` content.
    * - trigerd by `ready` method. 
    * #### !flat content
    * 
    */
    _setSloted() {
        const mainTemplate = () => litHtml` 
                <section slot="methods">
                    <special-anchor aria-label="method Fill Pixels" unresolved href="${this.rootPath}play/fillpixels?state=null" text="Fill Pixels">
                    </special-anchor>
                </section>
                <section slot="methods">
                    <special-anchor uaria-label="method Trace Path" unresolved href="${this.rootPath}play/tracepath?state=null" text="Trace Path">
                    </special-anchor>
                </section>
                <section slot="methods">
                    <special-anchor aria-label="method race Path 3d" unresolved href="${this.rootPath}play/tracepath3d?state=null" text="Trace Path 3d">
                    </special-anchor>
                </section>

                <section slot="anchors">
                    <special-anchor aria-label="Home" unresolved href="${this.rootPath}home?state=null" text="Home">
                    </special-anchor>
                </section>
                <section slot="anchors">
                    <special-anchor aria-label="Play" unresolved href="${this.rootPath}play?state=null" text="Play">
                    </special-anchor>
                </section>

                <h3 title="home_header" slot="home" id="main_title" aria-label="main title"> 
                    The Mandelbrot set with CANVAS 
                </h3>

                <div title="home_content" slot="home" aria-label="home_page_content">
                    <image-slider .images="${this.images}"> 
                    </image-slider>
                </div>

                <div id="buttons" aria-label="start stop buttons" slot="buttons">
                </div>

                <div id="canvas" aria-label="canvas" slot="canvas"> 
                </div>
                
                <ul id="footer" slot="footer" aria-label="footer"> 
                    <li aria-labelledby="footer"> by Deubledee </li>
                    <li aria-labelledby="footer"> about the project </li>
                    <li aria-labelledby="footer">  source code </li>
                </ul>
                `
        render(mainTemplate(), this)
    }
}

customElements.define(mandelbrotSet.is, mandelbrotSet);
