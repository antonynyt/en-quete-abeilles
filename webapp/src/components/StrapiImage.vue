<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    imageData: {
        type: Object,
        default: null
    },
    format: {
        type: String,
        default: 'medium',
        validator: (value) => ['thumbnail', 'small', 'medium', 'large', 'original'].includes(value)
    },
    alt: {
        type: String,
        default: ''
    },
    sizes: {
        type: String,
        default: '(max-width: 480px) 376px, (max-width: 768px) 565px, 753px'
    },
    loading: {
        type: String,
        default: 'lazy',
        validator: (value) => ['lazy', 'eager'].includes(value)
    },
    showPlaceholder: {
        type: Boolean,
        default: true
    },
    placeholderText: {
        type: String,
        default: 'Image not available'
    },
    imageClass: {
        type: String,
        default: ''
    },
    placeholderClass: {
        type: String,
        default: 'image-placeholder'
    }
})

const emit = defineEmits(['load', 'error'])

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

const imageUrl = computed(() => {
    if (!props.imageData) return ''

    if (props.format === 'original') {
        return `${STRAPI_BASE_URL}${props.imageData.url}`
    }

    const formatUrl = props.imageData.formats?.[props.format]?.url || props.imageData.url
    return `${STRAPI_BASE_URL}${formatUrl}`
})

const srcset = computed(() => {
    if (!props.imageData?.formats) return ''

    const formats = props.imageData.formats
    const srcsetArray = []

    if (formats.small) {
        srcsetArray.push(`${STRAPI_BASE_URL}${formats.small.url} ${formats.small.width}w`)
    }
    if (formats.medium) {
        srcsetArray.push(`${STRAPI_BASE_URL}${formats.medium.url} ${formats.medium.width}w`)
    }
    if (formats.large) {
        srcsetArray.push(`${STRAPI_BASE_URL}${formats.large.url} ${formats.large.width}w`)
    }

    return srcsetArray.join(', ')
})

const altText = computed(() => {
    return props.alt || props.imageData?.alternativeText || props.imageData?.caption || ''
})

const onImageLoad = (event) => {
    emit('load', event)
}

const onImageError = (event) => {
    emit('error', event)
}
</script>

<template>
    <img v-if="imageData" :src="imageUrl" :alt="alt" :srcset="srcset" :sizes="sizes" :class="imageClass"
        :loading="loading" @error="onImageError" @load="onImageLoad" />
    <div v-else-if="showPlaceholder" :class="placeholderClass">
        <slot name="placeholder">
            <span>{{ placeholderText }}</span>
        </slot>
    </div>
</template>

<style scoped>
img {
    max-width: 100%;
    height: auto;
    display: block;
}

.image-placeholder {
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