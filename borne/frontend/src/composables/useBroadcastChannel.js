import { ref, onUnmounted } from 'vue'
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
            message.value = event.data.data
        } else if (event.data.type === 'navigate' && allowNavigation) {
            router.push(event.data.path)
        }
    }

    onUnmounted(() => {
        bc.close()
    })

    return {
        message,
        sendMessage,
        sendNavigation,
    }
}
