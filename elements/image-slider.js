import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/av-icons';
import '@polymer/iron-icons/image-icons';
import '@polymer/iron-icons/iron-icons';
import { html, PolymerElement } from '@polymer/polymer';

import { html as litHtml, render } from 'lit-html';
class imageSlider extends PolymerElement {

    static get template() {
        return html`
          <style> 
        nav {
            overflow: hidden;
            box-sizing: border-box;
            display: grid;
            grid-template-columns: [col-1] 6px [col-2] 656px [col-3] 6px ;
            grid-template-rows: [row-1] 25px [row-2] 622px [row-3] 55px;
            grid-template-areas: 
                "playbutton playbutton playbutton"
                "sideleft images sideright"
                "sideleft circles sideright";   
        }
        .buttons-area{
            grid-area: playbutton;
        }

       .pause-button ,
        .play-button {
                float: right;
                position: relative;
                right: 10px;
        }

        .play-button {             
            color: var(--google-green-500);
        }

        .pause-button {
            color: var(--paper-red-500);
        }
     
        .side-arow {
            height: 60px;
            width: 50px;
            margin-block-start: 145px;
            border-radius: 18px;
        }

        .side-arow-left {
            background-color: rgba(245, 8, 8, 0.32);
            float: right;
        }

        .side-arow-right {
            background-color: rgba(8, 8, 245, 0.32);
        }

        .sidebar-area-left {
            grid-area: sideleft;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            left: 6px;
        }

        .sidebar-area-right {
            grid-area: sideright;
            right: 80px;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }

        .sidebar-area-left, 
        .sidebar-area-right {
            position: relative;
            height: 400px;
            width: 80px;
            top: 21%;
            box-sizing: border-box;
            visibility: collapse;
            background-color: rgba(0, 0, 0, 0);
            color: rgba(0, 0, 0, 0)
        }

        div[showleft] {
            visibility: visible;            
            background-color: rgba(0, 0, 0, 0.1803921568627451);
            color: var(--light-theme-background-color);
            transition: visibility ease-out 0.5s 0s, background-color ease-out 0.5s 0s, color ease-out 0.5s 0s;
        }
        
        div[showright] {
            visibility: visible;            
            background-color: rgba(0, 0, 0, 0.1803921568627451);
            color: var(--light-theme-background-color);
            transition: visibility ease-out 0.5s 0s, background-color ease-out 0.5s 0s, color ease-out 0.5s 0s;
        }

        a[play] {
            display: none
        }

        iron-icon[move]{
            display: none
        }

        iron-icon[showleft]{
            display: none
        }

        iron-icon[showright]{
            display: none
        }

        iron-icon[blue]{
            color: var(--paper-light-blue-500);
        }

        iron-icon[red]{
            color: var(--paper-red-a400);
        }

        .image-area {
            grid-area: images;
        }      

        .circle-area {
            position: relative;
            bottom: 20px;
            display: flex;
            flex-direction: row;
            width: auto;
            border-radius: 14px;
            padding: 10px;
            margin-left: auto;
            margin-right: auto;
            color: var(--primary-background-color);
            background-color: rgba(33, 33, 33, 0.25098039215686274);
        } 

        .circle-area-item{
            flex-basis: 16px;
            max-width: 16px;
            max-height: 0px;
            margin-inline-end: 22px;
            cursor: pointer;
            transition: visibility ease 0.5s 0s;
        }

        .circle-area-item-floater {
            position: relative;
            min-width: 16px;
            max-height: 2px;
            visibility: collapse;
            transition: left 0.5s ease 0s;
        }
        
        .overflow-area{
            display: flex;
            flex-direction: row;
            scroll-behavior: smooth;     
        }

        .image-area-item {
            grid-area: imgs; 
            display: grid;
            grid-template-columns: 666px;
            grid-template-rows: [row1] 1px [row2] auto;
            grid-template-areas: 
                "text"
                "src";       
            grid-gap: 10px;
        }

        ::slotted(img) {
            grid-area: src; 
        }

        ::slotted(h3) {
            grid-area: text; 
            z-index: 1;
        }


        </style>   
        <app-location route="{{route}}">
        </app-location>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subRoute}}" query-params="{{query}}">
        </app-route>
          <nav>      
            <div class="buttons-area">  
                <a play$="[[play]]" href="[[this.rootPath]]home?state=null&play=true">
                    <iron-icon class="play-button"  icon="av:play-circle-outline" aria-label="pause-button">
                    </iron-icon> 
                </a>
                <a play$="[[!play]]" href="[[this.rootPath]]home?state=null&play=false">
                    <iron-icon class="pause-button"  icon="av:pause-circle-outline" aria-label="pause-button">
                    </iron-icon> 
                </a>
            </div>   
            <div showleft$="[[showleft]]" class="sidebar-area-left" on-mouseover="_keepMeOpen"> 
                <iron-icon  class="side-arow side-arow-left" icon="image:navigate-before" aria-label="side arow left" on-click="_slideOneAtATime">
                </iron-icon> 
            </div>       
            <div showright$="[[showright]]" class="sidebar-area-right" on-mouseover="_keepMeOpen"> 
                <iron-icon  class="side-arow side-arow-right" icon="image:navigate-next" aria-label="side arow right" on-click="_slideOneAtATime">
                </iron-icon> 
            </div>
            <section class="image-area" on-mousemove="_openCorrectSideBar">
                <nav id="overflowarea" class="overflow-area">
                    <dom-repeat repeat items="[[images]]" as="image">
                        <template> 
                            <div class="image-area-item">
                                <slot name="text-[[index]]">
                                </slot>
                                <slot name="img-[[index]]">
                                </slot>
                            </div>
                        </template>                            
                    </dom-repeat> 
              </nav>
            </section>
            <section id="circlearea" class="circle-area">
                <div id="floater"  class="circle-area-item-floater"> 
                    <iron-icon move$="[[move]]" icon="radio-button-checked" aria-label="circles">
                    </iron-icon> 
                    <iron-icon move$="[[!move]]" blue$="[[blue]]" red$="[[red]]" icon="image:blur-circular" aria-label="circles">
                    </iron-icon> 
                </div>
                <dom-repeat repeat items="[[images]]" as="image">
                    <template>                      
                        <div class="circle-area-item" on-click="_scrollMyIndex">
                            <slot name="icon-[[index]]">
                            </slot>
                        </div>  
                    </template>                            
                </dom-repeat> 
            </section>
          </nav>
          `
    }

    static get is() { return 'image-slider' }
    static get properties() {
        return {
            images: {
                type: Array,
                notify: true,
                observer: '_setElements'
            },
            href: {
                type: String,
                noify: true
            },
            text: {
                type: String,
                notify: true
            },
            showleft: {
                type: Boolean,
                notify: true,
                value: false,
                reflectToAttribute: true
            },
            showright: {
                type: Boolean,
                notify: true,
                value: false,
                reflectToAttribute: true
            },
            play: {
                type: Boolean,
                notify: true,
                value: false,
                reflectToAttribute: true
            },
            blue: {
                type: Boolean,
                notify: true,
                reflectToAttribute: true
            },
            red: {
                type: Boolean,
                notify: true,
                reflectToAttribute: true
            },
            move: {
                type: Boolean,
                notify: true,
                value: false,
                reflectToAttribute: true
            },
            lastIndex: {
                type: Number,
                value: 1,
            },
            gofront: {
                type: Boolean,
                value: true
            }
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData.page, query.play)'
        ];
    }
    ready() {
        super.ready()
        // window.addEventListener('resize', (this._resetCanvas).bind(this))
        setTimeout(() => {
            this.$.floater.style.left = '24px'
            this.$.floater.style.visibility = "visible";
            this.$.circlearea.children[this.lastIndex].style.visibility = "collapse";
        }, 120);
    }
    _routePageChanged(page, play) {
        if (typeof this.time0 === 'number') clearTimeout(this.time0)
        this.play = (play === 'true')
        this.time0 = setTimeout(() => {
            if (page === 'home') {
                if (!!this.play) {
                    this._play()
                    this.showleft = false
                    this.showright = false
                }
            }
        }, 60);
    }
    _scrollMyIndex(evt) {
        let index = !!evt.model ? evt.model.__data.index : evt,
            child = index + 1
        let leftBasis = this.$.floater.style.left,
            offset = (this.$.circlearea.children[child].offsetLeft - this.$.circlearea.children[this.lastIndex].offsetLeft)
        leftBasis = parseInt(leftBasis.split('px')[0])
        this.$.circlearea.children[child].style.visibility = "collapse";
        if (Math.sign(offset) === -1) {
            this.red = true
            this.blue = false
        } else {
            this.red = false
            this.blue = true
        }
        this.move = true
        this.$.circlearea.children[this.lastIndex].style.visibility = "visible"; /* */
        this.$.floater.style.left = leftBasis + offset + 'px'
        this.lastIndex = child
        this.$.overflowarea.scrollLeft = 666 * index
        setTimeout(() => {
            this.move = false
        }, 500);
    }
    _openCorrectSideBar(evt) {
        if (this.play === false) {
            if (typeof this.time === 'number') clearTimeout(this.time)
            let halfRight = (656 / 3)
            let halfLeft = halfRight
            halfRight = (656 - halfLeft)
            if (evt.offsetX >= halfRight) {
                this.showleft = false
                this.showright = true
            }
            if (evt.offsetX <= halfLeft) {
                this.showleft = true
                this.showright = false
            }
            this.time = this._clearSides()
        }
    }
    _keepMeOpen(evt) {
        clearTimeout(this.time)
        if (!!evt.srcElement.classList.contains("sidebar-area-left") || !!evt.srcElement.classList.contains("side-arow-left")) {
            this.showleft = true
            this.showright = false
        } else {
            this.showleft = false
            this.showright = true
        }
    }
    _slideOneAtATime(evt) {
        if (!!evt.srcElement.classList.contains("side-arow-left")) {
            if (this.$.overflowarea.scrollLeft > 0)
                this._scrollMyIndex(this.lastIndex - 2)

        } else {
            if (this.$.overflowarea.scrollLeft < (this.$.overflowarea.scrollWidth - 666))
                this._scrollMyIndex(this.lastIndex)
        }
    }
    _clearSides() {
        return setTimeout(() => {
            this.showleft = false
            this.showright = false
            clearTimeout(this.time)
        }, 2000);
    }
    _setElements(data) {
        if (data.length > 0) {
            const homeTemplate = (images) => litHtml`${images.map((image, index) => {
                return litHtml`
                    <h3 slot="text-${index}">
                        ${image.text}
                    </h3>
                    <img slot="img-${index}" src="${image.url}"\>
                    <iron-icon slot="icon-${index}" icon="radio-button-unchecked" aria-label="circles">
                    </iron-icon>`
            })}`
            render(homeTemplate(data), this)
        }
    }
    _play() {
        this.play = true
        this.time2 = undefined
        let animation = () => {
            if (this.play === false) { clearTimeout(this.time2); return }
            this.time2 = setTimeout(() => {
                if (this.gofront === true) {
                    if (this.$.overflowarea.scrollLeft < (this.$.overflowarea.scrollWidth - 666)) {
                        this._scrollMyIndex(this.lastIndex)
                    }
                    else if (this.$.overflowarea.scrollLeft >= (this.$.overflowarea.scrollWidth - 666)) {
                        this.gofront = false
                    }
                } else {
                    if (this.$.overflowarea.scrollLeft > 0) {
                        this._scrollMyIndex(this.lastIndex - 2)
                    }
                    else if (this.$.overflowarea.scrollLeft <= 0) {
                        this.gofront = true
                    }
                }
                animation()
            }, 3000);
        }
        animation()
    }
}
customElements.define(imageSlider.is, imageSlider);
