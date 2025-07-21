<script setup>
import StrapiImage from '@/components/StrapiImage.vue';
import VideoPlayerControls from '@/components/VideoPlayerControls.vue';
import DetailLayout from '@/layouts/DetailLayout.vue';

</script>

<template>
    <DetailLayout v-slot="{ subject }" :blueToBottom="'20%'">
        <div class="subject-detail">
            <div class="subject-infos">
                <StrapiImage v-if="subject.cover" :imageData="subject.cover" class="subject-image"
                    :alt="subject.title" />
                <div class="subject-content" v-if="subject.description">
                    <h1>{{ subject.title }}</h1>
                    <p>{{ subject.description }}</p>
                </div>
            </div>
            <VideoPlayerControls class="controls" />
        </div>
    </DetailLayout>
</template>

<style scoped>
.subject-detail {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
}

p {
    font-size: var(--font-size-md);
}

.subject-infos {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--spacing-md);
    margin: 0 var(--spacing-md);
}

.subject-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 16 / 9;
    border: var(--border-size) solid var(--color-brown);
    border-radius: var(--radius-sm);
}

.controls {
    margin: 0 var(--spacing-md);
}
</style>