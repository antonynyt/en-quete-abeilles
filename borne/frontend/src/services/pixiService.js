import { PixiApp } from './pixi/PixiApp.js'
import { BeeManager } from './pixi/BeeManager.js'

class PixiService {
    constructor() {
        this.pixiApp = new PixiApp()
        this.beeManager = null
    }

    async initialize(containerElement) {
        await this.pixiApp.initialize(containerElement)
        this.beeManager = new BeeManager(this.pixiApp.container, this.pixiApp.texture)

        this.pixiApp.startTicker((delta) => {
            this.beeManager.updateBees(delta, this.pixiApp.screen)
        })
    }

    setBees(beeArray) {
        this.beeManager?.setBees(beeArray, this.pixiApp.screen.width, this.pixiApp.screen.height)
    }

    syncWithStore(storeBeesArray) {
        this.beeManager?.syncWithStore(
            storeBeesArray,
            this.pixiApp.screen.width,
            this.pixiApp.screen.height,
        )
    }

    addBee(beeData) {
        this.beeManager?.addBee(beeData, this.pixiApp.screen.width, this.pixiApp.screen.height)
    }

    hideNametags() {
        this.beeManager?.hideNametags()
    }

    toggleNametags() {
        this.beeManager?.toggleNametags()
    }

    stopAnimation() {
        this.pixiApp.stopAnimation()
    }

    startAnimation() {
        this.pixiApp.startAnimation()
    }

    destroy() {
        this.beeManager?.clear()
        this.pixiApp.destroy()
        this.beeManager = null
    }
}

const pixiService = new PixiService()
export default pixiService
