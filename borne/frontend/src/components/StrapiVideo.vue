<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    videoData: {
        type: Object,
        default: null
    },
    controls: {
        type: Boolean,
        default: true
    },
    autoplay: {
        type: Boolean,
        default: false
    },
    muted: {
        type: Boolean,
        default: false
    },
    loop: {
        type: Boolean,
        default: false
    },
    preload: {
        type: String,
        default: 'metadata',
        validator: (value) => ['none', 'metadata', 'auto'].includes(value)
    },
    poster: {
        type: String,
        default: ''
    },
    showPlaceholder: {
        type: Boolean,
        default: true
    },
    placeholderText: {
        type: String,
        default: 'Video not available'
    },
    videoClass: {
        type: String,
        default: ''
    },
    placeholderClass: {
        type: String,
        default: 'video-placeholder'
    },
    width: {
        type: [String, Number],
        default: null
    },
    height: {
        type: [String, Number],
        default: null
    }
})

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

const video = ref()

defineExpose({
    videoElement: video
})

const videoUrl = computed(() => {
    if (!props.videoData) return ''
    return `${STRAPI_BASE_URL}${props.videoData.url}`
})

const posterUrl = computed(() => {
    if (props.poster) return props.poster
    // If videoData has a thumbnail or preview image
    if (props.videoData?.previewUrl) {
        return `${STRAPI_BASE_URL}${props.videoData.previewUrl}`
    }
    return ''
})

const videoTitle = computed(() => {
    return props.videoData?.alternativeText || props.videoData?.caption || props.videoData?.name || ''
})



</script>

<template>
    <video v-if="videoData" ref="video" :src="videoUrl" :poster="posterUrl" :controls="controls" :autoplay="autoplay" :muted="muted"
        :loop="loop" :preload="preload" :class="videoClass" :width="width" :height="height" :title="videoTitle">
        Your browser does not support the video tag.
    </video>
    <div v-else-if="showPlaceholder" :class="placeholderClass">
        <slot name="placeholder">
            <span>{{ placeholderText }}</span>
        </slot>
    </div>
</template>

<style scoped>
video {
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: var(--radius-sm);
}

.video-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    color: #666;
    padding: 2rem;
    border-radius: 4px;
    min-height: 200px;
}
</style>