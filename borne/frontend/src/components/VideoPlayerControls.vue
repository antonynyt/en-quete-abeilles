<script setup>
import { ref, watch, computed } from 'vue';
import { useBroadcastChannel } from '@/composables/useBroadcastChannel';
import IconPlay from './icons/IconPlay.vue'
import IconPause from './icons/IconPause.vue'

const { message, sendMessage } = useBroadcastChannel('media-control');

const videoState = ref({
    currentTime: 0,
    duration: 0,
    paused: true,
    ended: false
});

const progress = computed(() => {
    if (videoState.value.duration === 0) return 0;
    return (videoState.value.currentTime / videoState.value.duration) * 100;
});

const currentTimeFormatted = computed(() => {
    return formatTime(videoState.value.currentTime);
});

const durationFormatted = computed(() => {
    return formatTime(videoState.value.duration);
});

const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const togglePlayPause = () => {
    sendMessage({ action: 'toggle' });
};

const seekTo = (event) => {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * videoState.value.duration;
    
    sendMessage({
        action: 'seek',
        time: newTime 
    });
};

// Listen for video state updates
watch(message, (newMessage) => {
    if (newMessage) {
        videoState.value = { ...newMessage.data };
    }
});

</script>

<template>
    <div class="player__controls">
        <button class="player__button button" @click="togglePlayPause">
            <IconPause v-if="!videoState.paused" />
            <IconPlay v-else />
        </button>
        
        <div class="progress" @click="seekTo">
            <div 
                class="progress__filled" 
                :style="{ width: progress + '%' }"
            ></div>
        </div>
        
        <div class="player__timing">
            <span class="player__current-time">{{ currentTimeFormatted }}</span>
            <span class="player__duration">{{ durationFormatted }}</span>
        </div>
    </div>
</template>

<style scoped>
.player__controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    background: var(--color-beige-light);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    border: var(--border-size) solid var(--color-beige);
}

.player__button {
    color: var(--color-brown);
    display: flex;
    width: auto;
    min-width: 2em;
    justify-content: center;
}

.player__button :deep(svg) {
    height: var(--font-size-lg);
    width: auto;
}

.progress {
    display: flex;
    height: 1em;
    background: var(--color-beige);
    cursor: pointer;
    border-radius: 1em;
    flex-grow: 1;
    position: relative;
}

.progress__filled {
    background: var(--color-brown);
    border-radius: 100px;
    position: relative;
}

.progress__filled::after {
    content: '';
    position: absolute;
    height: 1.5em;
    width: 0.5em;
    border-radius: 1em;
    right: -0.1em;
    top: -0.25em;
    background: var(--color-brown);
}

.player__timing {
    display: flex;
    gap: var(--spacing-xs);
    min-width: 5rem;
}

.player__current-time,
.player__duration {
    color: var(--color-brown);
    font-size: var(--font-size-xs);
}

.player__duration::before {
    content: '/';
    margin-right: var(--spacing-xs);
    color: var(--color-brown-light);
}
</style>