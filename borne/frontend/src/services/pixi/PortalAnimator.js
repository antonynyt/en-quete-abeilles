import { Container, Graphics } from 'pixi.js'

export class PortalAnimator {
    constructor(container) {
        this.container = container
        this.animatingBees = new Set()
    }

    createPortalAnimation(bee, x, y, onComplete) {
        const portalContainer = new Container()
        portalContainer.x = x
        portalContainer.y = y

        const portal = new Graphics()
        portal.circle(0, 0, 80)
        portal.fill({ color: 0x4a90e2, alpha: 0.8 })

        const innerGlow = new Graphics()
        innerGlow.circle(0, 0, 40)
        innerGlow.fill({ color: 0x87ceeb, alpha: 0.6 })

        const alveol = new Graphics()
        const hexRadius = 30
        alveol.moveTo(hexRadius, 0)
        for (let i = 1; i <= 6; i++) {
            const angle = (i * Math.PI) / 3
            const x = Math.cos(angle) * hexRadius
            const y = Math.sin(angle) * hexRadius
            alveol.lineTo(x, y)
        }
        alveol.stroke({ color: 0xffffff, width: 3, alpha: 0.7 })

        portalContainer.addChild(portal)
        portalContainer.addChild(innerGlow)
        portalContainer.addChild(alveol)

        this.container.addChild(portalContainer)

        bee.sprite.x = x
        bee.sprite.y = y
        bee.sprite.scale.set(0)
        bee.sprite.alpha = 0

        bee.label.visible = false
        bee.label.x = x
        bee.label.y = y - 50

        this.container.addChild(bee.sprite)
        this.container.addChild(bee.label)
        this.animatingBees.add(bee)

        this.animatePortalEntry(portalContainer, bee, alveol, onComplete)
    }

    animatePortalEntry(portalContainer, bee, swirl, onComplete) {
        let animationTime = 0
        const totalDuration = 3000

        const animate = () => {
            animationTime += 16.67

            if (animationTime < totalDuration) {
                const progress = animationTime / totalDuration

                if (progress < 0.4) {
                    const phaseProgress = progress / 0.4
                    const scale = this.easeOutBack(phaseProgress)
                    portalContainer.scale.set(scale)
                    swirl.rotation += 0.1
                } else if (progress < 0.8) {
                    const phaseProgress = (progress - 0.4) / 0.4
                    const beeScale = this.easeOutBack(phaseProgress) * 0.18
                    const beeAlpha = phaseProgress

                    bee.sprite.scale.set(beeScale)
                    bee.sprite.alpha = beeAlpha

                    const bounce = Math.sin(phaseProgress * Math.PI) * 10
                    bee.sprite.y = portalContainer.y - bounce

                    swirl.rotation += 0.08
                } else {
                    const phaseProgress = (progress - 0.8) / 0.2
                    const portalScale = 1 - this.easeInBack(phaseProgress)
                    const portalAlpha = 1 - phaseProgress

                    portalContainer.scale.set(portalScale)
                    portalContainer.alpha = portalAlpha

                    if (phaseProgress > 0.5) {
                        bee.label.visible = true
                        const labelAlpha = (phaseProgress - 0.5) / 0.5
                        bee.label.alpha = labelAlpha
                    }

                    swirl.rotation += 0.05
                }

                requestAnimationFrame(animate)
            } else {
                this.container.removeChild(portalContainer)
                this.animatingBees.delete(bee)

                bee.sprite.alpha = 1
                bee.sprite.scale.set(0.18)
                bee.label.alpha = 1
                bee.label.visible = true

                onComplete(bee)
            }
        }

        animate()
    }

    easeOutBack(t) {
        const c1 = 1.70158
        const c3 = c1 + 1
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
    }

    easeInBack(t) {
        const c1 = 1.70158
        const c3 = c1 + 1
        return c3 * t * t * t - c1 * t * t
    }

    isAnimating(bee) {
        return this.animatingBees.has(bee)
    }
}
