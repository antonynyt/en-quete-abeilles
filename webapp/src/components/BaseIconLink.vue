<script setup>

const props = defineProps({
    link: {
        type: String,
        required: true,
    },
    icon: {
        type: [String, Object],
        required: true,
    },
    label: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <RouterLink :to="link" class="icon-link">
        <component :is="icon" class="icon" />
        <span class="visually-hidden">{{ label }}</span>
    </RouterLink>
</template>

<style scoped>
.icon-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    position: relative;
}

.icon-link::before {
    content: '';
    position: absolute;
    left: -0.8em;
    width: 3em;
    height: 3em;
    z-index: 99;
}
</style>