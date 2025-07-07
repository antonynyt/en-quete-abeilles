<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import WaveSurfer from 'wavesurfer.js'

const props = defineProps({
    audioData: {
        type: Object,
        required: true
    }
})

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

const audioUrl = computed(() => {
    if (!props.audioData) return ''
    return `${STRAPI_BASE_URL}${props.audioData.url}`
})

const audioTitle = computed(() => {
    return props.audioData?.alternativeText || props.audioData?.caption || props.audioData?.name || 'Audio file'
})

const audioCaption = computed(() => {
    return props.audioData?.caption || ''
})

const wavesurfer = ref(null)
const isPlaying = ref(false)
const currentTime = ref('0:00')
const waveformContainer = ref(null)

const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="2.2em" height="2.2em" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`
const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="2.2em" height="2.2em" aria-hidden="true"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`

const togglePlayPause = () => {
    if (wavesurfer.value.isPlaying()) {
        wavesurfer.value.pause()
        isPlaying.value = false
    } else {
        wavesurfer.value.play()
        isPlaying.value = true
    }
}

const handleKeydown = (event) => {
    if (!wavesurfer.value) return

    switch (event.key) {
        case 'ArrowLeft':
            event.preventDefault()
            wavesurfer.value.skip(-2)
            break
        case 'ArrowRight':
            event.preventDefault()
            wavesurfer.value.skip(2)
            break
        case ' ':
        case 'Enter':
            event.preventDefault()
            togglePlayPause()
            break
        case 'Home':
            event.preventDefault()
            wavesurfer.value.seekTo(0)
            break
        case 'End':
            event.preventDefault()
            wavesurfer.value.seekTo(1)
            break
    }
}

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${minutes}:${secs}`
}

const formatTimeReverse = (seconds, duration) => {
    const remaining = duration - seconds
    return formatTime(remaining)
}

onMounted(() => {
    const computedStyle = getComputedStyle(document.documentElement)
    const waveColor = computedStyle.getPropertyValue('--color-beige').trim() || '#aaa'
    const progressColor = computedStyle.getPropertyValue('--color-brown').trim() || '#383351'
    const cursorColor = computedStyle.getPropertyValue('--color-brown').trim() || '#000'

    wavesurfer.value = WaveSurfer.create({
        container: waveformContainer.value,
        waveColor: "#c0b092",
        progressColor: progressColor,
        "height": 32,
        "splitChannels": false,
        "normalize": false,
        "cursorColor": cursorColor,
        "cursorWidth": 3,
        "barWidth": 3,
        "barGap": 3,
        "barRadius": 13,
        "barHeight": 0.8,
        "minPxPerSec": 1,
        "fillParent": true,
        "hideScrollbar": true,
        "audioRate": 1,
        "autoScroll": true,
        "autoCenter": true,
        "sampleRate": 8000,
        "dragToSeek": true,
        backend: 'MediaElement'
    })

    wavesurfer.value.load(audioUrl.value)

    wavesurfer.value.on('audioprocess', () => {
        currentTime.value = formatTimeReverse(wavesurfer.value.getCurrentTime(), wavesurfer.value.getDuration())
    })

    wavesurfer.value.on('pause', () => {
        isPlaying.value = false
    })

    wavesurfer.value.on('play', () => {
        isPlaying.value = true
    })

    wavesurfer.value.on('finish', () => {
        wavesurfer.value.stop()
    })

    wavesurfer.value.on('seeking', () => {
        currentTime.value = formatTimeReverse(wavesurfer.value.getCurrentTime(), wavesurfer.value.getDuration())
    })

    wavesurfer.value.on('ready', () => {
        currentTime.value = formatTime(wavesurfer.value.getDuration())
    })
})

onBeforeUnmount(() => {
    if (wavesurfer.value) {
        wavesurfer.value.destroy()
    }
})
</script>

<template>
    <div class="audio-player" role="region" :aria-label="`Audio player for ${audioTitle}`">
        <div class="audio-player__controls">
            <button class="audio-player__play-button" @click="togglePlayPause"
                :aria-label="isPlaying ? `Pause ${audioTitle}` : `Play ${audioTitle}`" :aria-pressed="isPlaying"
                type="button" v-html="isPlaying ? pauseIcon : playIcon"></button>

            <div ref="waveformContainer" class="audio-player__waveform" role="slider"
                :aria-label="`Audio progress for ${audioTitle}. Use arrow keys to navigate, space or enter to play/pause`"
                aria-valuemin="0" aria-valuemax="100" :aria-valuenow="isPlaying ? 50 : 0" tabindex="0"
                @keydown="handleKeydown"></div>

            <time class="audio-player__time" :aria-label="`Time remaining: ${currentTime}`">
                {{ currentTime }}
            </time>
        </div>
        <div v-if="audioCaption" class="audio-caption">{{ audioCaption }}</div>
    </div>
</template>

<style scoped>
.audio-player__controls {
    display: flex;
    align-items: center;
    background-color: var(--color-beige-light);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    gap: var(--spacing-md);
    border: 2px solid var(--color-brown);
}

.audio-player__play-button {
    display: flex;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: background-color 0.2s ease;
    color: var(--color-brown);
}

.audio-player__waveform {
    width: 100%;
    min-height: 1em;
}

.audio-player__time {
    font-size: 0.9em;
    color: var(--color-brown);
    font-family: inherit;
    display: inline-block;
    min-width: 3em;
    text-align: center;
}

.audio-caption {
    margin-top: var(--spacing-sm);
    font-size: var(--font-size-xs);
    color: var(--color-brown);
    text-align: center;
}
</style>