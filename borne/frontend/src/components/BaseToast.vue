<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    message: {
        type: String,
        default: ''
    },
    duration: {
        type: Number,
        default: 3000
    },
    type: {
        type: String,
        default: '',
        validator: (value) => ['', 'primary', 'danger'].includes(value)
    },
    autoClose: {
        type: Boolean,
        default: true
    },
    autoShow: {
        type: Boolean,
        default: true
    }
});

const visible = ref(false);
const emit = defineEmits(['close']);

onMounted(() => {
    if (props.autoShow) {
        show();
    }
});

const show = () => {
    visible.value = true;

    if (props.autoClose && props.duration > 0) {
        setTimeout(() => {
            close();
        }, props.duration);
    }
};

const close = () => {
    visible.value = false;
    setTimeout(() => {
        emit('close');
    }, 300); // Match animation duration
};

defineExpose({ close, show });
</script>

<template>
    <Transition name="toast">
        <div v-if="visible" class="toast" :class="type">
            <slot></slot>
        </div>
    </Transition>
</template>

<style scoped>
.toast {
    position: fixed;
    top: var(--spacing-lg);
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 50%;
    padding: 0.65rem var(--spacing-md);
    border-radius: var(--radius-sm);
    font-size: inherit;
    font-family: 'Pally', sans-serif;
    font-weight: 500;
    text-align: center;
    border: var(--border-size) solid var(--color-brown);
    color: var(--color-brown);
    background-color: var(--color-beige-light);
    z-index: 1000;
}

.toast.primary {
    background-color: var(--color-orange);
}

.toast.danger {
    background-color: var(--color-orange-electric);
    color: var(--color-background);
}

/* Animation for showing/hiding toast */
.toast-enter-active,
.toast-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.toast-enter-from {
    transform: translateY(-200%);
    opacity: 0;
}

.toast-leave-to {
    transform: translateY(-200%);
    opacity: 0;
}
</style>