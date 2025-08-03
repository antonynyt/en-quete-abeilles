<script setup>
import { computed } from 'vue'
import StrapiVideo from '@/components/StrapiVideo.vue'
import { useVideoControl } from '@/composables/useVideoControl'

const props = defineProps({
    videoData: Object,
    autoplay: {
        type: Boolean,
        default: false
    },
    controls: {
        type: Boolean,
        default: false
    }
})

const { videoRef } = useVideoControl()
</script>

<template>
    <div class="video-player">
        <StrapiVideo 
            ref="videoRef" 
            :video-data="videoData" 
            :autoplay="autoplay"
            :controls="controls"
            class="video-element"
        />
    </div>
</template>

<style scoped>
.video-player {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.video-element {
    margin: 0 auto;
    width: 100%;
    max-width: 1920px;
    max-height: 100%;
    border: var(--border-size) solid var(--color-brown);
    border-radius: var(--radius-sm);
}
</style>