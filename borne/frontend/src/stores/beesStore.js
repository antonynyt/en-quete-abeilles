import { ref } from 'vue'
import { defineStore } from 'pinia'
import { generateBeeName } from '@/utils/nameGenerator'

export const useBeesStore = defineStore(
    'bees',
    () => {
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

        const beeExists = (beeId) => {
            return bees.value.some((bee) => bee.id === beeId)
        }

        const addScannedBee = (beeData) => {
            const newBee = {
                ...beeData,
                isScanned: true,
                showNametag: true,
            }

            const existingBee = beeExists(newBee.id)
            if (existingBee) return

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
            beeExists,
            addScannedBee,
            removeBee,
        }
    },
    {
        persist: true,
    },
)
