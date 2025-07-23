import { Application, Assets, Container, Sprite, Text, Graphics, TilingSprite } from 'pixi.js'
import bee from '@/assets/bee.png'
import pattern from '@/assets/hive.png'

class Bee {
    constructor(texture, beeData, nametagsVisible) {
        this.sprite = new Sprite(texture)
        this.sprite.anchor.set(0.5)
        this.sprite.scale.set(0.18)

        this.label = this.createLabel(beeData.name, nametagsVisible)
        this.vx = (Math.random() - 0.5) * 0.2
        this.vy = (Math.random() - 0.5) * 0.2

        this.minRotationSpeed = 0.1
    }

    createLabel(name, visible) {
        const label = new Container()
        const text = new Text({
            text: name,
            style: {
                fontSize: '20',
                fill: '#fff',
                align: 'center',
                fontFamily: 'Pally',
                fontWeight: 'bold',
                dropShadow: true,
                dropShadowDistance: 1,
            },
        })
        text.anchor.set(0.5)

        const textBg = new Graphics()
        textBg.roundRect(text.x - 20, text.y - 10, text.width + 40, text.height + 20, 8)
        textBg.fill({
            color: 'black',
            alpha: 0.5,
        })
        textBg.x = -text.width / 2
        textBg.y = -text.height / 2

        label.addChild(textBg)
        label.addChild(text)
        label.visible = visible

        return label
    }

    update(delta, bees, screen) {
        this.vx += (Math.random() - 0.5) * 0.03
        this.vy += (Math.random() - 0.5) * 0.03

        const separationDistance = 40
        let avoidX = 0
        let avoidY = 0
        let neighbors = 0

        bees.forEach((otherBee) => {
            if (otherBee === this) return
            const dx = this.sprite.x - otherBee.sprite.x
            const dy = this.sprite.y - otherBee.sprite.y
            const dist = Math.hypot(dx, dy)

            if (dist > 0 && dist < separationDistance) {
                avoidX += dx / dist
                avoidY += dy / dist
                neighbors++
            }
        })

        if (neighbors > 0) {
            this.vx += (avoidX / neighbors) * 0.02
            this.vy += (avoidY / neighbors) * 0.02
        }

        // Clamp speed
        const maxSpeed = 0.8
        const speed = Math.hypot(this.vx, this.vy)
        if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed
            this.vy = (this.vy / speed) * maxSpeed
        }

        this.sprite.x += this.vx * delta
        this.sprite.y += this.vy * delta

        // Border steering
        const steerStrength = 0.02
        const border = 40
        if (this.sprite.x < border) this.vx += steerStrength
        if (this.sprite.x > screen.width - border) this.vx -= steerStrength
        if (this.sprite.y < border) this.vy += steerStrength
        if (this.sprite.y > screen.height - border) this.vy -= steerStrength

        // Clamp position
        this.sprite.x = Math.max(0, Math.min(screen.width, this.sprite.x))
        this.sprite.y = Math.max(0, Math.min(screen.height, this.sprite.y))

        // Rotation
        if (speed > this.minRotationSpeed) {
            const targetRotation = Math.atan2(this.vy, this.vx) + Math.PI / 2
            const lerp = (a, b, t) => a + (((b - a + Math.PI) % (2 * Math.PI)) - Math.PI) * t
            this.sprite.rotation = lerp(this.sprite.rotation, targetRotation, 0.08)
        }

        // Update label position
        this.label.x = this.sprite.x
        this.label.y = this.sprite.y - 50
    }
}

class PixiService {
    constructor() {
        this.app = null
        this.container = null
        this.initialized = false
        this.bees = []
        this.nametagsVisible = true
    }

    async initialize(containerElement) {
        if (this.initialized && this.app) {
            containerElement.appendChild(this.app.canvas)
            return
        }

        this.app = new Application()
        await this.app.init({
            resizeTo: window,
            backgroundColor: '#ffcd68',
            autoDensity: true, 
            resolution: window.devicePixelRatio,
        })
        containerElement.appendChild(this.app.canvas)

        Assets.addBundle('fonts', [
            {
                alias: 'Pally',
                src: '/fonts/pally.woff2',
            },
        ])

        await Assets.loadBundle('fonts')

        // Wait for browser to load the font
        if (document.fonts) {
            await document.fonts.load('bold 20px "Pally"')
            await document.fonts.ready
        }

        //background
        const backgroundTexture = await Assets.load(pattern)
        const background = new TilingSprite({
            texture: backgroundTexture,
            width: this.app.screen.width,
            height: this.app.screen.height,
            tileScale: { x: 0.25, y: 0.25 },
            resizeTo: window,
        })
        this.app.stage.addChild(background)

        // container for bees
        this.container = new Container()
        this.app.stage.addChild(this.container)
        this.texture = await Assets.load(bee)

        // Initialize ticker for animation
        this.lastTime = performance.now()
        this.app.ticker.add(() => {
            const now = performance.now()
            const delta = Math.min(now - this.lastTime, 100) / 16.67
            this.lastTime = now
            this.updateBees(delta)
        })

        this.initialized = true
        this.app.resizeTo = window
    }

    setBees(beeArray) {
        if (this.bees.length > 0) return

        beeArray.forEach((beeData) => {
            const bee = new Bee(this.texture, beeData, this.nametagsVisible)

            bee.sprite.x = Math.random() * this.app.screen.width
            bee.sprite.y = Math.random() * this.app.screen.height

            this.container.addChild(bee.sprite)
            this.container.addChild(bee.label)
            this.bees.push(bee)
        })
    }

    updateBees(delta) {
        const screen = {
            width: this.app.screen.width,
            height: this.app.screen.height,
        }

        this.bees.forEach((bee) => {
            bee.update(delta, this.bees, screen)
        })
    }

    toggleNametags(isVisible) {
        this.nametagsVisible = !this.nametagsVisible
        this.bees.forEach((bee) => {
            bee.label.visible = this.nametagsVisible
        })
    }

    hideNametags() {
        this.nametagsVisible = false
        this.bees.forEach((bee) => {
            bee.label.visible = false
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

    cleanup() {
        if (this.app?.canvas?.parentNode) {
            this.app.canvas.parentNode.removeChild(this.app.canvas)
        }
    }

    destroy() {
        if (this.app) {
            this.app.destroy(true)
            this.app = null
            this.container = null
            this.bees = []
            this.initialized = false
        }
    }
}

const pixiService = new PixiService()
export default pixiService
