<script setup>
import { computed } from 'vue'

const props = defineProps({
    embedData: {
        type: Object,
        default: null
    },
    showPlaceholder: {
        type: Boolean,
        default: true
    },
    placeholderText: {
        type: String,
        default: 'Embed not available'
    }
})

const emit = defineEmits(['load', 'error'])

const embedHtml = computed(() => {
    if (!props.embedData?.oembed?.html) return ''
    return props.embedData.oembed.html
})

const embedTitle = computed(() => {
    return props.embedData?.oembed?.title || 'Embedded Content'
})

const embedUrl = computed(() => {
    return props.embedData?.url || ''
})

const thumbnailUrl = computed(() => {
    return props.embedData?.oembed?.thumbnail_url || ''
})

const providerName = computed(() => {
    return props.embedData?.oembed?.provider_name || ''
})

const onEmbedLoad = (event) => {
    emit('load', event)
}

const onEmbedError = (event) => {
    emit('error', event)
}
</script>

<template>
    <div v-if="embedData && embedHtml" class="embed-container">
        <div v-html="embedHtml" @load="onEmbedLoad" @error="onEmbedError" class="embed-content" />
    </div>

    <div v-else-if="showPlaceholder" class="embed-placeholder">
        <slot name="placeholder">
            <div class="placeholder-content">
                <img v-if="thumbnailUrl" :src="thumbnailUrl" :alt="embedTitle" class="placeholder-thumbnail" />
                <span>{{ placeholderText }}</span>
                <a v-if="embedUrl" :href="embedUrl" target="_blank" rel="noopener noreferrer" class="placeholder-link">
                    View on {{ providerName }}
                </a>
            </div>
        </slot>
    </div>
</template>

<style scoped>
.embed-container {
    width: 100%;
    margin: var(--spacing-lg) 0;
}

.embed-content :deep(iframe) {
    width: 100%;
    height: 100%;
    border: none;
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-sm);
}

.embed-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    color: #666;
    padding: 2rem;
    border-radius: var(--radius-sm);
    min-height: 200px;
}

.placeholder-content {
    text-align: center;
    max-width: 300px;
}

.placeholder-thumbnail {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 1rem;
}

.placeholder-link {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.9rem;
}

.placeholder-link:hover {
    background-color: #0056b3;
}
</style>