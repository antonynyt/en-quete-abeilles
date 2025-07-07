<script setup>
import StrapiEmbed from '../StrapiEmbed.vue';

const props = defineProps({
    block: {
        type: Object,
        required: true
    }
});

</script>

<template>
    <section>
        <StrapiEmbed v-if="block.embed" :embedData="block.embed" class="base-embed-block" />
    </section>
</template>