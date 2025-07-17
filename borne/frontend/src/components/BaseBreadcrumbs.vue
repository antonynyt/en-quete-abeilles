<script setup>

defineProps({
    title: {
        type: String,
    },
    subjectTitle: {
        type: String,
        required: false,
    },
});

</script>

<template>
    <span class="pally">{{ title }}{{ subjectTitle ? ` : ${subjectTitle.toLowerCase()}` : '' }}</span>
</template>

<style scoped>
span {
    font-size: var(--font-size-md);
}
</style>