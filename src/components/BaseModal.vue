<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])
function close() {
    emit('close')
}
</script>

<template>
    <div class="modal-overlay" @click.self="close">
        <div class="modal-container">
            <button class="close-button" @click="close">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    fill="currentColor">
                    <path
                        d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
                </svg>
            </button>
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-container {
    position: relative;
    background-color: var(--color-beige-light);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg) var(--spacing-md);
    width: calc(100% - var(--spacing-sm) * 2);
    max-width: 600px;
    max-height: 90%;
    border: var(--border-size) solid var(--color-beige);
    box-shadow:
        var(--shadow-offset-y) var(--color-beige);
    overflow: auto;
}

.close-button {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
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

.modal-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}
</style>
