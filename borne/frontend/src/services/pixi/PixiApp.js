import { Application, Assets, Container, TilingSprite } from 'pixi.js'
import bee from '@/assets/bee.png'
import pattern from '@/assets/hive.png'

export class PixiApp {
    constructor() {
        this.app = null
        this.container = null
        this.initialized = false
        this.currentContainer = null
        this.texture = null
        this.lastTime = performance.now()
    }

    async initialize(containerElement) {
        if (this.initialized && this.app) {
            if (this.currentContainer !== containerElement) {
                containerElement.appendChild(this.app.canvas)
                this.currentContainer = containerElement
            }
            return
        }

        // Check if there's already a canvas in the container (from hot reload)
        const existingCanvas = containerElement.querySelector('canvas')
        if (existingCanvas) {
            existingCanvas.remove()
        }

        this.app = new Application()
        await this.app.init({
            resizeTo: window,
            backgroundColor: '#ffcd68',
            autoDensity: true,
            resolution: window.devicePixelRatio,
        })
        containerElement.appendChild(this.app.canvas)

        await this.loadAssets()
        this.setupBackground()
        this.setupContainer()

        this.initialized = true
        this.currentContainer = containerElement
    }

    async loadAssets() {
        Assets.addBundle('fonts', [
            {
                alias: 'Pally',
                src: '/fonts/pally.woff2',
            },
        ])

        await Assets.loadBundle('fonts')

        if (document.fonts) {
            await document.fonts.load('bold 20px "Pally"')
            await document.fonts.ready
        }

        this.texture = await Assets.load(bee)
        this.patternTexture = await Assets.load(pattern)
    }

    setupBackground() {
        const background = new TilingSprite({
            texture: this.patternTexture,
            width: this.app.screen.width,
            height: this.app.screen.height,
            tileScale: { x: 0.25, y: 0.25 },
            resizeTo: window,
        })
        this.app.stage.addChild(background)
    }

    setupContainer() {
        if (this.container) {
            this.container.removeChildren()
        } else {
            this.container = new Container()
            this.app.stage.addChild(this.container)
        }
    }

    startTicker(updateCallback) {
        this.lastTime = performance.now()
        this.app.ticker.add(() => {
            const now = performance.now()
            const delta = Math.min(now - this.lastTime, 100) / 16.67
            this.lastTime = now
            updateCallback(delta)
        })
    }

    stopAnimation() {
        if (this.app && this.app.ticker) {
            this.app.ticker.stop()
        }
    }

    startAnimation() {
        if (this.app && this.app.ticker) {
            this.app.ticker.start()
        }
    }

    destroy() {
        if (this.app) {
            this.app.destroy(true, true)
            this.initialized = false
            this.currentContainer = null
        }
    }

    get screen() {
        return {
            width: this.app.screen.width,
            height: this.app.screen.height,
        }
    }
}
