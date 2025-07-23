<script setup>
import { RouterLink } from 'vue-router';
import StrapiImage from './StrapiImage.vue';

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    showIcon: {
        type: Boolean,
        default: false
    }
});

</script>

<template>
    <RouterLink :to="to" class="card">
        <div class="image-container">
            <StrapiImage :imageData="item.cover" :alt="item.title" class="cover button" />
            <div v-if="showIcon" class="icon-overlay">
                <slot name="icon" />
            </div>
        </div>
        <h2>{{ item.title }}</h2>
    </RouterLink>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: inherit;
    gap: var(--spacing-md);
    width: 40vw;
    min-width: 300px;
    /* flex-shrink: 0; */
}

h2 {
    font-size: var(--font-size-lg);
}

/* Cover image */
.button {
    padding: 0;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
}

.image-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon-overlay {
    position: absolute;
    background-color: var(--color-beige);
    line-height: 0;
    border-radius: var(--radius-sm);
    padding: var(--spacing-xs);
    aspect-ratio: 1;
}

.icon-overlay :deep(svg) {
    width: 2rem;
    height: 2rem;
    color: var(--color-brown);
}
</style>