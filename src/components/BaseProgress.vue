<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    currentStep: {
        type: Number,
        default: 0
    },
    totalSteps: {
        type: Number,
        default: 100
    },
});

const progress = computed(() => {
    return Math.min(Math.max(props.currentStep, 0), props.totalSteps) / props.totalSteps * 100;
});
</script>

<template>
    <div class="progress-bar">
        <div class="progress" :style="{ width: `${progress}%` }"></div>
    </div>
</template>

<style scoped>
.progress-bar {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 0.5rem;
    background-color: var(--color-beige);
    border-radius: var(--radius-sm);
    overflow: hidden;
}

.progress {
    height: 100%;
    background-color: var(--color-orange);
    width: 0;
    transition: width 0.3s ease;
}
</style>