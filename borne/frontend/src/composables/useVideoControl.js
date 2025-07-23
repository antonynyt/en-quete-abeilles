import { ref, watch, onUnmounted } from 'vue'
import { useBroadcastChannel } from '@/composables/useBroadcastChannel'

export function useVideoControl() {
    const { message, sendMessage } = useBroadcastChannel('media-control')
    const videoRef = ref(null)
    let updateInterval = null

    const sendVideoState = () => {
        if (videoRef.value?.videoElement) {
            const video = videoRef.value.videoElement
            sendMessage({
                currentTime: video.currentTime,
                duration: video.duration || 0,
                paused: video.paused,
                ended: video.ended,
            })
        }
    }

    const setupVideoListeners = () => {
        if (videoRef.value?.videoElement) {
            const video = videoRef.value.videoElement

            // Send state on important events
            video.addEventListener('loadedmetadata', sendVideoState)
            video.addEventListener('play', sendVideoState)
            video.addEventListener('pause', sendVideoState)
            video.addEventListener('timeupdate', sendVideoState)
        }
    }

    const cleanupVideoListeners = () => {
        if (videoRef.value?.videoElement) {
            const video = videoRef.value.videoElement

            // Remove all event listeners
            video.removeEventListener('loadedmetadata', sendVideoState)
            video.removeEventListener('play', sendVideoState)
            video.removeEventListener('pause', sendVideoState)
            video.removeEventListener('timeupdate', sendVideoState)
        }
    }

    const handleVideoMessage = (newMessage) => {
        if (newMessage && videoRef.value?.videoElement) {
            const action = newMessage.data?.action
            const videoElement = videoRef.value.videoElement

            switch (action) {
                case 'toggle':
                    if (videoElement.paused) {
                        videoElement.play()
                    } else {
                        videoElement.pause()
                    }
                    break
                case 'seek':
                    if (newMessage.data.time !== undefined) {
                        videoElement.currentTime = newMessage.data.time
                    }
                    break
            }
        }
    }

    const initializeVideo = () => {
        if (videoRef.value?.videoElement) {
            const video = videoRef.value.videoElement

            if (video.readyState >= 1) {
                setupVideoListeners()
                sendVideoState()
            } else {
                video.addEventListener(
                    'loadedmetadata',
                    () => {
                        setupVideoListeners()
                        sendVideoState()
                    },
                    { once: true },
                )
            }
        }
    }

    // Watch for video control messages
    watch(message, handleVideoMessage)

    // Watch for video ref changes
    watch(videoRef, initializeVideo)

    // Cleanup on unmount
    onUnmounted(() => {
        cleanupVideoListeners()
    })

    return {
        videoRef,
        sendVideoState,
        initializeVideo,
    }
}
