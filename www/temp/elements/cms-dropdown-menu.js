import { html } from '@polymer/polymer';
import { cmsDropdownMenuTemplate } from '../templates/cms-dropdown-menu-template';

export class cmsDropdownMenu extends cmsDropdownMenuTemplate {

    static get _getStyles() {
        return html`
        .alt {
             padding-inline-start: unset;
            }
        .flexright {
            min-height: unset;
            max-width: unset;
        }
        `
    }
    static get is() {
        return 'cms-dropdown-menu';
    }
    static get properties() {
        return {
            items: {
                type: Array,
                notify: true,
                observer: '__setValues'
            }
        };
    }
    _log(data) {
        console.log(data)
    }
    ready() {
        super.ready();
    }
}
customElements.define(cmsDropdownMenu.is, cmsDropdownMenu);
