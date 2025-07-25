import { ref } from 'vue'
import router from '../router'

export function useBroadcastChannel(channelName = 'hive', allowNavigation = true) {
    const message = ref('')
    const bc = new BroadcastChannel(channelName)

    const sendMessage = (data) => {
        bc.postMessage({ type: 'message', data })
    }

    const sendBee = (beeData) => {
        bc.postMessage({ type: 'add-bee', beeData })
    }

    const highlightBee = (beeId) => {
        bc.postMessage({ type: 'highlight-bee', beeId })
    }

    const sendNavigation = (path) => {
        bc.postMessage({ type: 'navigate', path })
    }

    bc.onmessage = (event) => {
        switch (event.data.type) {
            case 'message':
                message.value = { type: 'message', data: event.data.data, time: Date.now() } //timestamp force reactivity
                break
            case 'add-bee':
                if (typeof event.data.beeData !== 'object') {
                    event.data.beeData = JSON.parse(event.data.beeData)
                }
                message.value = { type: 'add-bee', data: event.data.beeData, time: Date.now() } //timestamp force reactivity
                break
            case 'highlight-bee':
                message.value = { type: 'highlight-bee', data: event.data.beeId, time: Date.now() }
                break
            case 'navigate':
                if (allowNavigation) {
                    router.push(event.data.path)
                }
                break
        }
    }

    return {
        message,
        sendMessage,
        sendBee,
        highlightBee,
        sendNavigation,
    }
}
