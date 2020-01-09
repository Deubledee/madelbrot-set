
import { PolymerElement, html } from '@polymer/polymer';
class specialAnchor extends PolymerElement {
    static get template() {
        return html`
          <style> 
            .mood { color: green; }   
            a {
            text-decoration: none;
            }
            div{
              width: 100%;
              text-align: center
            }
          </style>     
          <div>
            <a  href="[[href]]">
              [[text]]
            </a>
          </div>
          `;
    }
    static get is() { return 'special-anchor' }
    static get properties() {
        return {
            text: String,
            href: String
        }
    }
    ready() {
        super.ready()
    }
}
customElements.define(specialAnchor.is, specialAnchor);
