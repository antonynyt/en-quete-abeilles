export const lightenHexColor = (color, factor = 0.8) => {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)

    // Make it lighter by blending with white
    const lighterR = Math.round(r + (255 - r) * factor)
    const lighterG = Math.round(g + (255 - g) * factor)
    const lighterB = Math.round(b + (255 - b) * factor)

    return `#${lighterR.toString(16).padStart(2, '0')}${lighterG.toString(16).padStart(2, '0')}${lighterB.toString(16).padStart(2, '0')}`
}
