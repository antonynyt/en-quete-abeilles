<script setup>
import BaseTextBlock from '@/components/blocks/BaseTextBlock.vue';
import BaseMediaBlock from './blocks/BaseMediaBlock.vue';
import BaseEmbedBlock from './blocks/BaseEmbedBlock.vue';

const props = defineProps({
    blocks: {
        type: Array,
        required: true
    }
});

const resolveComponent = (type) => {
    const map = {
        'content.text': BaseTextBlock,
        'content.media': BaseMediaBlock,
        'content.embed': BaseEmbedBlock,
    };
    return map[type] || null;
};
</script>

<template>
    <div>
        <component v-for="(block, index) in blocks" :key="index" :is="resolveComponent(block.__component)"
            :block="block" />
    </div>
</template>
