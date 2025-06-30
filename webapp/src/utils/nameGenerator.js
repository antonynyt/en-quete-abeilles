export const generateBeeName = () => {
    const prefixes = [
        'Miel',
        'Buzzy',
        'Mini',
        'Chérie',
        'Douce',
        'Zéphyr',
        "P'tite",
        'Astro',
        'Luna',
        'Ziggy',
    ]
    const nouns = [
        'Nectar',
        'Boulette',
        'Fleur',
        'Pollen',
        'Ray',
        'Mielou',
        'Dard',
        'Cosmos',
        'Glimmer',
        'Frimousse',
    ]

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]

    return `${prefix}${noun}`.trim()
}
