class specialButton extends HTMLButtonElement {
    constructor() {
        super()
        this.addEventListener('click', (this.startOrStop).bind(this))
    }
    startOrStop() {
        let path = new URL(location.href)
        let route = path.pathname.split('/')
        console.log(this.title)
        /*   if (route.indexOf('color') !== -1) {
             if (this.title === 'stop') {
               stopAniamtion()
             }
             if (this.title === 'start') {
               resetAniamtion()
               startTraceAniamtion()
             }
   
           }
           if (route.indexOf('trace') !== -1) {
             if (this.title === 'stop') {
               stopAniamtion()
             }
             if (this.title === 'start') {
               resetAniamtion()
               startColorAniamtion()
             }
           }*/
    }
}
customElements.define('special-button', specialButton);
