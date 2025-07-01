export const isValidTaskUrl = (url) => {
    const baseUrl = import.meta.env.VITE_BASE_URL || 'https://localhost:5174'
    const escapedBaseUrl = baseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    const regex = new RegExp(`^(https?:\\/\\/)?(www\\.)?${escapedBaseUrl}\\/t\\/[a-z0-9]{24}$`)
    if (!regex.test(url)) {
        console.warn('wrong URL format:', url)
    }
    return regex.test(url)
}

export const extractTaskIdFromUrl = (url) => {
    const regex = /\/t\/([a-z0-9]{24})$/
    const match = url.match(regex)
    return match ? match[1] : null
}
