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
            <slot name="left-side">
                <h1>{{ title }}</h1>
            </slot>
            <slot name="right-side" />
        </div>
    </header>
</template>

<style scoped>
.page-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: var(--spacing-md) auto;
}

.page-header h1 {
    margin: 0;
    font-size: var(--font-size-xl);
}
</style>