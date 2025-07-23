import { ref } from 'vue'
import { defineStore } from 'pinia'
import { generateBeeName } from '@/utils/nameGenerator'

export const useBeesStore = defineStore('bees', () => {
    const bees = ref([])
    

    const initializeDefaultBees = () => {
        if (bees.value.length === 0) {
            for (let i = 0; i < 10; i++) {
                bees.value.push({
                    id: `default-${i}`,
                    name: generateBeeName(),
                    isScanned: false,
                    showNametag: false,
                })
            }
        }
    }

    const addScannedBee = (beeData) => {
        const uid = `scanned-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        const newBee = {
            ...beeData,
            id: uid,
            isScanned: true,
            showNametag: true,
        }
        //TODO: CHANGE TO TAKE ID FROM SCANNED BEE AND COMPARE WITH IT
        // Check if bee already exists to avoid duplicates
        const existingBee = bees.value.find(
            (bee) =>
                bee.name === beeData.name &&
                bee.level === beeData.level &&
                JSON.stringify(bee.tasksCompleted) === JSON.stringify(beeData.tasksCompleted),
        )

        if (!existingBee) {
            bees.value.push(newBee)
        }

        return newBee
    }

    const removeBee = (beeId) => {
        const index = bees.value.findIndex((bee) => bee.id === beeId)
        if (index > -1) {
            bees.value.splice(index, 1)
        }
    }

    return {
        bees,
        initializeDefaultBees,
        addScannedBee,
        removeBee,
    }
})
