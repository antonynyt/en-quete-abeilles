<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const dialog = ref();
const visible = ref(false);

const showModal = () => {
    dialog.value?.showModal();
    visible.value = true;
};

const close = () => {
    dialog.value?.close();
    visible.value = false;
};

defineExpose({
    show: showModal
});

// Handle clicks outside the dialog
const handleBackdropClick = (event) => {
    // Check if the click was directly on the dialog element (the backdrop)
    // and not on any of its children
    if (event.target === dialog.value) {
        close();
    }
};

onMounted(() => {
    // Add mousedown listener when component is mounted
    dialog.value?.addEventListener('mousedown', handleBackdropClick);
});

onBeforeUnmount(() => {
    // Clean up the event listener when component is unmounted
    dialog.value?.removeEventListener('mousedown', handleBackdropClick);
});
</script>

<template>
    <dialog class="modal-container" ref="dialog" @close="visible = false" closedby="any">
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
    </dialog>
</template>

<style scoped>
::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
    position: relative;
    background-color: var(--color-beige-light);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg) var(--spacing-md);
    width: calc(100% - var(--spacing-sm) * 2);
    max-width: 550px;
    max-height: 90%;
    border: var(--border-size) solid var(--color-beige);
    box-shadow:
        var(--shadow-offset-y) var(--color-beige);
    overflow: auto;
    margin: auto;
}

.close-button {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
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
