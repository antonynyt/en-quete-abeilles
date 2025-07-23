import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const currentBee = ref(null)
    const isConnected = ref(false)

    const setCurrentBee = (beeData) => {
        currentBee.value = beeData
        isConnected.value = true
    }

    const clearCurrentBee = () => {
        currentBee.value = null
        isConnected.value = false
    }

    return {
        currentBee,
        isConnected,
        setCurrentBee,
        clearCurrentBee,
    }
})
