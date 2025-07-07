<script setup>
import { computed } from 'vue';
import StrapiImage from '../StrapiImage.vue';
import StrapiAudio from '../StrapiAudio.vue';
import StrapiVideo from '../StrapiVideo.vue';

const props = defineProps({
    block: {
        type: Object,
        required: true
    }
})

const getMediaType = (media) => {
    if (!media || !media.mime) return 'unknown';

    const mimeType = media.mime.toLowerCase();

    if (mimeType.startsWith('image/')) {
        return 'image';
    } else if (mimeType.startsWith('video/')) {
        return 'video';
    } else if (mimeType.startsWith('audio/')) {
        return 'audio';
    }

    return 'unknown';
};

const mediaType = computed(() => getMediaType(props.block.Media));
</script>

<template>
    <section class="base-media-block">
        <StrapiImage v-if="mediaType === 'image'" :imageData="block.Media" :format="block.formats"
            class="base-media-block__image" />

        <StrapiVideo v-if="mediaType === 'video'" :videoData="block.Media" :videoCaption="block.caption"
            class="base-media-block__video" />

        <StrapiAudio v-else-if="mediaType === 'audio'" :audioData="block.Media" :audioCaption="block.caption" />

        <div v-else class="base-media-block__unsupported">
            Unsupported media type
        </div>
    </section>
</template>

<style scoped>
.base-media-block {
    padding: var(--spacing-md) 0;
}

.base-media-block__image {
    margin: var(--spacing-md) 0;
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: var(--radius-sm);
}
</style>