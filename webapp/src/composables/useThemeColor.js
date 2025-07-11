import { onMounted, onUnmounted } from 'vue'

export function useThemeColor(color, resetOnUnmount = true) {
    let previousColor = null

    const setThemeColor = (newColor) => {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]')
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta')
            metaThemeColor.name = 'theme-color'
            document.head.appendChild(metaThemeColor)
        }

        if (previousColor === null) {
            previousColor = metaThemeColor.content || '#FFFFFF'
        }

        metaThemeColor.content = newColor
    }

    const resetThemeColor = () => {
        if (previousColor !== null) {
            setThemeColor(previousColor)
        }
    }

    onMounted(() => {
        if (color) {
            setThemeColor(color)
        }
    })

    onUnmounted(() => {
        if (resetOnUnmount) {
            resetThemeColor()
        }
    })

    return {
        setThemeColor,
        resetThemeColor,
    }
}
