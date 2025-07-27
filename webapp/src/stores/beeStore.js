import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBeeStore = defineStore(
    'beeinfo',
    () => {
        const id = ref(crypto.randomUUID())
        const name = ref('MiniPollen') // use of generateBeeName is in Step4.vue
        const trait1 = ref('Curieuse')
        const trait2 = ref('Aventurière')
        const flower = ref('Lavande')
        const enemy = ref('Guêpes')

        const level = ref('Novice')

        // Level progression based on tasks completed
        const levelTiers = [
            { threshold: 0, name: 'Novice' },
            { threshold: 0.2, name: 'Nettoyeuse' },
            { threshold: 0.4, name: 'Bâtisseuse' },
            { threshold: 0.6, name: 'Ventileuse' },
            { threshold: 0.8, name: 'Gardienne' },
            { threshold: 1.0, name: 'Butineuse' },
        ]

        function updateLevel(completedTasksCount, totalTasksCount) {
            if (totalTasksCount === 0) return false

            const completionRatio = completedTasksCount / totalTasksCount

            // Find the highest level tier that the player has reached
            const newLevel = levelTiers
                .slice()
                .reverse()
                .find((tier) => completionRatio >= tier.threshold)

            if (newLevel && level.value !== newLevel.name) {
                level.value = newLevel.name
                return { leveledUp: true, newLevel: newLevel.name }
            }
            return { leveledUp: false }
        }

        return { id, name, level, updateLevel, trait1, trait2, flower, enemy }
    },
    {
        persist: true,
    },
)
