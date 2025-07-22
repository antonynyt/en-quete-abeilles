import { ref } from 'vue'
import router from '../router'

export function useBroadcastChannel(channelName = 'hive', allowNavigation = true) {
    const message = ref('')
    const bc = new BroadcastChannel(channelName)

    const sendMessage = (data) => {
        bc.postMessage({ type: 'message', data })
    }

    const sendNavigation = (path) => {
        bc.postMessage({ type: 'navigate', path })
    }

    bc.onmessage = (event) => {
        if (event.data.type === 'message') {
            message.value = { type: 'message', data: event.data.data, time: Date.now() } //timestamp force reactivity
        } else if (event.data.type === 'navigate' && allowNavigation) {
            router.push(event.data.path)
        }
    }

    return {
        message,
        sendMessage,
        sendNavigation,
    }
}
