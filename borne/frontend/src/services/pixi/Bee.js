import { Sprite, Container, Text, Graphics } from 'pixi.js'

export class Bee {
    constructor(texture, beeData) {
        this.sprite = new Sprite(texture)
        this.sprite.anchor.set(0.5)
        this.sprite.scale.set(0.18)

        this.id = beeData.id
        this.label = this.createLabel(beeData.name)
        this.vx = (Math.random() - 0.5) * 0.2
        this.vy = (Math.random() - 0.5) * 0.2
        this.minRotationSpeed = 0.1
    }

    createLabel(name) {
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
        textBg.fill({ color: 'black', alpha: 0.5 })
        textBg.x = -text.width / 2
        textBg.y = -text.height / 2

        label.addChild(textBg)
        label.addChild(text)
        label.visible = false

        return label
    }

    update(delta, bees, screen) {
        // movement logic
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

        const maxSpeed = 0.8
        const speed = Math.hypot(this.vx, this.vy)
        if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed
            this.vy = (this.vy / speed) * maxSpeed
        }

        this.sprite.x += this.vx * delta
        this.sprite.y += this.vy * delta

        const steerStrength = 0.02
        const border = 40
        if (this.sprite.x < border) this.vx += steerStrength
        if (this.sprite.x > screen.width - border) this.vx -= steerStrength
        if (this.sprite.y < border) this.vy += steerStrength
        if (this.sprite.y > screen.height - border) this.vy -= steerStrength

        this.sprite.x = Math.max(0, Math.min(screen.width, this.sprite.x))
        this.sprite.y = Math.max(0, Math.min(screen.height, this.sprite.y))

        if (speed > this.minRotationSpeed) {
            const targetRotation = Math.atan2(this.vy, this.vx) + Math.PI / 2
            const lerp = (a, b, t) => a + (((b - a + Math.PI) % (2 * Math.PI)) - Math.PI) * t
            this.sprite.rotation = lerp(this.sprite.rotation, targetRotation, 0.08)
        }

        this.label.x = this.sprite.x
        this.label.y = this.sprite.y - 50
    }
}
