let wsInstance = null

export const getWebSocketInstance = () => {
    if (!wsInstance) {
        wsInstance = new WebSocket('ws://localhost:3000/ws')

        wsInstance.onopen = () => {
            console.log('WebSocket connection established')
        }

        wsInstance.onerror = (error) => {
            console.error('WebSocket error:', error)
        }

        wsInstance.onclose = () => {
            console.log('WebSocket connection closed')
            wsInstance = null // Reset instance when closed
        }
    }

    return wsInstance
}
