<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import StrapiImage from '@/components/StrapiImage.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

const props = defineProps({
    module: Object,
    subject: Object
})

const route = useRoute()

const currentMedia = computed(() => {
    if (props.subject?.video && route.params.subjectId) {
        return props.subject.video
    }
    return null
})

</script>

<template>
    <!-- Show subject media if available -->
    <div v-if="subject && route.params.subjectId" class="media-container">
        <div class="video-wrapper">
            <VideoPlayer :video-data="currentMedia" autoplay :controls="false" />
        </div>
    </div>

    <!-- Show module info when no subject is selected -->
    <div v-else-if="module" class="module-info">
        <div class="module-info-content">
            <h1>{{ module.title }}</h1>
            <p>{{ module.description }}</p>
        </div>
        <div class="module-info-cover">
            <StrapiImage :imageData="module.cover" class="cover-img" />
        </div>
    </div>
</template>

<style scoped>
.module-info {
    background-color: var(--color-background);
    display: grid;
    grid-template-columns: 2fr 1fr;

    position: absolute;
    bottom: var(--spacing-md);
    right: var(--spacing-md);
    width: 70%;
    height: auto;

    border: var(--border-size) solid var(--color-brown);
    border-radius: var(--radius-sm);
    overflow: hidden;
}

.module-info-content {
    padding: var(--spacing-md);
}

.module-info-cover {
    width: 100%;
    height: auto;
    display: flex;
}

.cover-img {
    aspect-ratio: 4 / 3;
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.media-container {
    position: absolute;
    display: flex;
    justify-content: center;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    padding: var(--spacing-sm);
}

.video-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.subject-video {
    margin: 0 auto;
    width: auto;
    max-height: 100%;
    border: var(--border-size) solid var(--color-brown);
    border-radius: var(--radius-sm);
}
</style>