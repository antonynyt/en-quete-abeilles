<script setup>
import IconCross from '@/components/icons/IconCross.vue'

const emit = defineEmits(['close'])
function close() {
    emit('close')
}
</script>

<template>
    <button class="close-button" @click="close">
        <IconCross />
        <span class="visually-hidden">Fermer</span>
    </button>
</template>

<style scoped>
.close-button {
    background: none;
    border: none;
    border-radius: 100%;
    font-size: 24px;
    cursor: pointer;
    color: var(--color-brown);
    padding: 0;
    height: 48px;
    width: 48px;
    text-align: center;
    background-color: var(--color-beige);

    display: flex;
    justify-content: center;
    align-items: center;
}

.close-button:hover {
    color: #000;
}
</style>