export const generateBeeName = () => {
    const prefixes = [
        'Buzzy',
        'Mini',
        "P'tite",
        'Fast',
        'Luna',
        'Sunny',
        'Flora',
        'Doudou',
        'Zaza',
        'Poupou',
        'Jolie',
        'Nana',
        'Sissi',
        'Titi',
        'Fanfan',
    ]
    const nouns = [
        'Boulette',
        'Fleur',
        'Pollen',
        'Mielou',
        'Frimousse',
        'Pikpik',
        'Paillette',
        'Cocotte',
        'Zinzine',
        'Tournesol',
        'Lavande',
        'Pivoine',
        'Marguerite',
        'Tulipe',
        'Orchidée',
        'Bleuet',
        'Coquelicot',
        'Violette',
    ]

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]

    return `${prefix}${noun}`.trim()
}

export const generateCaracterTrait = () => {
    const traits = [
        'Curieuse',
        'Aventurière',
        'Sage',
        'Joyeuse',
        'Protectrice',
        'Indépendante',
        'Créative',
        'Gentille',
        'Intrépide',
    ]

    return traits[Math.floor(Math.random() * traits.length)]
}

export const generateFlowerTrait = () => {
    const flowers = [
        'la Lavande',
        'le Trèfle',
        'la Phacélie',
        'la Bourrache',
        'la Sauge',
        'le Tournesol',
        'le Romarin',
        'le Tilleul',
        'le Pissenlit',
        'le Thym',
        'la Menthe',
        "l'Aubépine",
        'le Châtaignier',
        'la Coriandre',
        "l'Érable",
        'le Colza',
        "l'Acacia",
    ]

    return flowers[Math.floor(Math.random() * flowers.length)]
}

export const generateEnnemyTrait = () => {
    const enemies = [
        'Frelons asiatiques',
        'Guêpes',
        'Varroas',
        'Fourmis',
        'Araignées',
        'Blattes',
        'Souris',
        'Pics verts',
        'Blaireaux',
        'Ours',
        'Mésanges',
        'Moustiques',
        'Crapauds',
        'Libellules',
    ]

    return enemies[Math.floor(Math.random() * enemies.length)]
}
