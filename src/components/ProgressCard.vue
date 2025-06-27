<script setup>
import router from '@/router';
import BaseIcon from './BaseIcon.vue';
import BaseProgress from './BaseProgress.vue';
import IconCrown from './icons/IconCrown.vue';
import { useGameStore } from '@/stores/gameStore';

const gameStore = useGameStore()
</script>

<template>
    <a href="/tasks" @click.prevent="router.push('/tasks')">
        <BaseIcon color=" var(--color-brown)">
            <IconCrown color="var(--color-orange)" />
        </BaseIcon>
        <div class="progress-title">
            <h2>Retrouver l'essaim</h2>
            <div class="progress-wrapper">
                <p>Complété {{ gameStore.tasksDone }}/{{ gameStore.totalTasks }}</p>
                <BaseProgress :currentStep=gameStore.tasksDone :totalSteps=gameStore.totalTasks
                    style="height: 0.5em;" />
            </div>
        </div>
    </a>
</template>
<style scoped>
a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background-color: var(--color-beige-light);
    border-radius: var(--radius-md);
    border: var(--border-size) solid var(--color-beige);
}

.progress-title {
    display: flex;
    flex-direction: column;
    width: 100%;
}

a h2 {
    font-size: var(--font-size-md);
    margin: 0;
}

p {
    margin: 0;
    text-wrap: nowrap;
    font-size: var(--font-size-xs);
}

.progress-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}
</style>