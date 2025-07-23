import { PixiApp } from './pixi/PixiApp.js'
import { BeeManager } from './pixi/BeeManager.js'

class PixiService {
    constructor() {
        this.pixiApp = new PixiApp()
        this.beeManager = null
        this.tickerStarted = false
    }

    async initialize(containerElement) {
        await this.pixiApp.initialize(containerElement)
        
        // Only create BeeManager if it doesn't exist yet
        if (!this.beeManager) {
            this.beeManager = new BeeManager(this.pixiApp.container, this.pixiApp.texture)
            
            if (!this.tickerStarted) {
                this.pixiApp.startTicker((delta) => {
                    this.beeManager.updateBees(delta, this.pixiApp.screen)
                })
                this.tickerStarted = true
            }
        } else {
            // If BeeManager exists, just update its container reference
            this.beeManager.container = this.pixiApp.container
            
            this.beeManager.bees.forEach((bee) => {
                this.pixiApp.container.addChild(bee.sprite)
                this.pixiApp.container.addChild(bee.label)
            })
        }
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
