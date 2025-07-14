<script setup>
const props = defineProps({
    color: {
        type: String,
        default: 'var(--color-beige)'
    }
});

</script>

<template>
    <div class="icon" :style="{ backgroundColor: color }">
        <slot />
    </div>
</template>

<style scoped>
.icon {
    display: flex;
    place-items: center;
    place-content: center;
    color: inherit;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-sm);
    flex-shrink: 0;
}

.icon svg {
    width: 100%;
    height: 100%;
}
</style>