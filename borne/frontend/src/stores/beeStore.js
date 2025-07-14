import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBeeStore = defineStore('beeinfo', () => {
    const name = ref('ButineuseLavande') // generateBeeName is in Step4.vue
    const level = ref('Novice')

    // Level progression based on tasks completed
    const levelTiers = [
        { min: 0, max: 0, name: 'Novice' },
        { min: 1, max: 2, name: 'Nettoyeuse' },
        { min: 3, max: 3, name: 'Ventilleuse' },
        { min: 4, max: 5, name: 'Gardienne' },
        { min: 6, max: Infinity, name: 'Butineuse' },
    ]

    function updateLevel(completedTasksCount) {
        const newLevel = levelTiers.find(
            (tier) => completedTasksCount >= tier.min && completedTasksCount <= tier.max,
        )
        if (newLevel && level.value !== newLevel.name) {
            level.value = newLevel.name
            return true // Level up occurred
        }
        return false
    }

    return { name, level, updateLevel }
})
