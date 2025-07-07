<script setup>
import StrapiImage from '../StrapiImage.vue';

const props = defineProps({
    block: {
        type: Object,
        required: true
    }
});

</script>

<template>
    <section>
        <h3 v-if="block.subtitle">{{ block.subtitle }}</h3>
        <div v-for="paragraph in block.paragraph">
            <p>{{ paragraph.content }}</p>
            <StrapiImage v-if="paragraph.image" :imageData="paragraph.image" :format="block.paragraph[0].image.formats"
                class="img" />
        </div>
    </section>
</template>

<style scoped>
section {
    margin-bottom: var(--spacing-md);
}

h3 {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-sm);
    margin-top: var(--spacing-lg);
}

.img {
    margin: var(--spacing-md) 0;
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: var(--radius-sm);
}
</style>