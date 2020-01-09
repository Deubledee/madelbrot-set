


import { html as litHtml, render } from 'lit-html';
import { PolymerElement, html } from '@polymer/polymer';
class specialCanvas extends PolymerElement {
    static get template() {
        return html`
        <slot name="canvas-slot"></slot>
        `
    }
    static get is() { return 'mandelbrot-set' }
    static get properties() {
        return {
            ctx: String,
            dimentions: {
                type: String,
                notify: true
            },
            width: {
                type: String,
                computed: 'computeWidth(dimentions)'

            },
            height: {
                type: String,
                computed: 'computeHeight(dimentions)'

            },
            color: {
                type: String,
                notify: true
            },
            minval: {
                type: Number,
                value: -1.5
            },
            maxval: {
                type: Number,
                value: 1.5,
            },
            stop: {
                type: Boolean,
                value: false,
            },
            scaleValue: {
                type: Number,
                value: 1,
            },
            maxiterations: {
                type: Number,
                value: 150,
            },
            limit: {
                type: Number,
                value: 11
            },
            execute: {
                type: String,
                value: '',
                observer: 'runMethod'
            }
        }
    }

    ready() {
        super.ready()
        let mandelbrotSet = document.querySelector('mandelbrot-set')
        const canvasTemplate = () => litHtml`<canvas slot="canvas"></canvas>`

        render(canvasTemplate(), mandelbrotSet)
        this.set('canvas', mandelbrotSet.children[0])
        this.canvas.width = this.width || '600'
        this.canvas.height = this.height || '600'
        this.ctx = this.canvas.getContext('2d')

        this.ctx.fillStyle = this.color || 'rgb(255, 0, 0)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        /*    var minval = -1.5,
                maxval = 1.5,
                stop = false,
                scaleValue = 1,
                maxiterations = 150,
                limit = 11*/
    }
    runMethod(method) {
        console.log(method);
    }
    computeWidth(dimentions) {
        return dimentions.split(',')[0]
    }
    computeHeight(dimentions) {
        return dimentions.split(',')[1]
    }
    resetAniamtion() {
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.stop = true
    }
    stopAniamtion() {
        this.stop = true
    }

    map(value, start, stop, start2, stop2) {
        var result = (value - start) / (stop - start) * (stop2 - start2) + start2;
        return result
    }
}

customElements.define('special-canvas', specialCanvas);
