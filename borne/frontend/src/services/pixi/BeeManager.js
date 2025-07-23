import { Bee } from './Bee.js'
import { PortalAnimator } from './PortalAnimator.js'

export class BeeManager {
    constructor(container, texture) {
        this.container = container
        this.texture = texture
        this.bees = []
        this.nametagsVisible = false
        this.portalAnimator = new PortalAnimator(container)
    }

    setBees(beeArray, screenWidth, screenHeight) {
        if (this.bees.length === 0) {
            beeArray.forEach((beeData) => {
                const bee = new Bee(this.texture, beeData)

                bee.sprite.x = Math.random() * screenWidth
                bee.sprite.y = Math.random() * screenHeight

                this.container.addChild(bee.sprite)
                this.container.addChild(bee.label)
                this.bees.push(bee)
            })
        }
    }

    addBee(beeData, screenWidth, screenHeight) {
        if (!this.texture) return

        const bee = new Bee(this.texture, beeData)

        const margin = 100
        const spawnX = margin + Math.random() * (screenWidth - 2 * margin)
        const spawnY = margin + Math.random() * (screenHeight - 2 * margin)

        this.hideNametags()

        this.portalAnimator.createPortalAnimation(bee, spawnX, spawnY, (completedBee) => {
            this.bees.push(completedBee)
        })
    }

    updateBees(delta, screen) {
        this.bees.forEach((bee) => {
            if (!this.portalAnimator.isAnimating(bee)) {
                bee.update(delta, this.bees, screen)
            }
        })
    }

    hideNametags() {
        this.nametagsVisible = false
        this.bees.forEach((bee) => {
            bee.label.visible = false
        })
    }

    toggleNametags() {
        this.nametagsVisible = !this.nametagsVisible
        this.bees.forEach((bee) => {
            bee.label.visible = this.nametagsVisible
        })
    }

    syncWithStore(storeBeesArray, screenWidth, screenHeight) {
        storeBeesArray.forEach((storeBee) => {
            const existingBee = this.bees.find((pixiBee) => pixiBee.id === storeBee.id)
            if (!existingBee && storeBee.isScanned) {
                this.addBee(storeBee, screenWidth, screenHeight)
            }
        })
    }

    clear() {
        this.bees.forEach((bee) => {
            if (bee.sprite.parent) {
                this.container.removeChild(bee.sprite)
            }
            if (bee.label.parent) {
                this.container.removeChild(bee.label)
            }
        })
        this.bees = []
    }
}
