
import { PolymerElement, html } from '@polymer/polymer';
import { html as litHtml, render } from 'lit-html';
import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
class specialAnchor extends PolymerElement {
  static get template() {
    return html`
          <style> 
              nav{                           
                display: grid;
                grid-template-columns: [col1] auto;
                grid-template-rows: [row1] auto [row2] 2px;
                grid-template-areas: 
                  "anchor"                    
                  "slider"; 
                align-items: center;
                justify-items: center;
              }
            .anchor-div {          
              width: 127px;
              text-align: center;
              padding: 9px;
            }
           ::slotted(a) {
              grid-area: anchor;
              text-decoration: none;
            }
            div[background] {
              background-color: #d0faff;
            }
            .spanner-div {
              grid-area: slider;
              width: 0px; 
            }
            div[spanner] {
              width: 160px;     
              height: 2px;         
              box-shadow: 0px 1px 2px #5d9bb7;
              transition: width 1s ease;   
            }
          </style>            
        <app-location route="{{route}}">
        </app-location>
        <app-route route="{{route}}" pattern="/:view" data="{{routeData}}" tail="{{subRoute}}" query-params="{{query}}">
        </app-route> 
        <nav>
          <div background$="[[background]]"class="anchor-div">
            <slot name="anchor"></slot>
          </div>
          <div class="spanner-div" spanner$="[[spanner]]">
          </div>
        </nav>
          `;
  }
  static get is() { return 'special-anchor' }
  static get properties() {
    return {
      href: {
        type: String,
        noify: true
      },
      text: {
        type: String,
        notify: true
      },
      background: {
        type: Boolean,
        notify: true,
        value: false,
        reflectToAttribute: true
      },
      spanner: {
        type: Boolean,
        notify: true,
        value: false,
        reflectToAttribute: true
      },
      type: {
        type: String,
        value: 'anchor'
      }
    }
  }

  static get observers() {
    return [
      '_slotAnchor(href, text)',
      '_routePageChanged(route.path, query)'
    ];
  }
  ready() {
    super.ready()
  }
  _routePageChanged(view, query) {
    let url = new URL(this.href)
    if (this.type === 'anchor') {
      this.__triggerAnchor(view === url.pathname)
    }
    if (this.type === 'button') {
      let Q = !!query.state ? query.state : ''
      //  if (Q === 'null') return
      this.__triggerButton(this.text.toLowerCase() === Q)
    }
  }
  _slotAnchor(href, text) {
    const anchorTemplate = (h, t) => litHtml`<a slot="anchor" href="${h}">${t}</a>`
    render(anchorTemplate(href, text), this)
  }
  __triggerAnchor(view) {
    if (!!view) {
      this.spanner = true
    } else {
      this.spanner = false
    }
  }
  __triggerButton(view) {
    if (!!view) {
      this.background = true
    } else {
      this.background = false
    }
  }
}
customElements.define(specialAnchor.is, specialAnchor);
