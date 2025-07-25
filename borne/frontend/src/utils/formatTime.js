export const formatTimeFromTimestamp = (milliseconds) => {
    if (!milliseconds || milliseconds < 0) return '0 seconde'

    const seconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    const parts = []

    if (hours > 0) {
        parts.push(`${hours} heure${hours > 1 ? 's' : ''}`)
    }

    if (minutes > 0) {
        parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`)
    }

    if (remainingSeconds > 0 || parts.length === 0) {
        parts.push(`${remainingSeconds} seconde${remainingSeconds > 1 ? 's' : ''}`)
    }

    return parts.join(' et ')
}
