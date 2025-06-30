<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'Page Title',
    },
});

</script>

<template>
    <header class="full-width">
        <div class="page-header centered">
            <h1>{{ title }}</h1>
            <slot name="right-side">
            </slot>
        </div>
    </header>
</template>

<style scoped>
.page-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.page-header h1 {
    margin: 0;
    font-size: var(--font-size-xl);
}
</style>