<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import RoundCloseButton from './RoundCloseButton.vue';

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
    show: showModal,
    close: close
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
        <RoundCloseButton @close="close" class="close-btn" />
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

.modal-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.close-btn {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
}
</style>
