<script setup>
import { onMounted } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import BaseTask from '@/components/BaseTask.vue';
import BaseProgress from '@/components/BaseProgress.vue';
import BgGrass from '@/components/BgGrass.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import IconCrown from '@/components/icons/IconCrown.vue';
import { useGameStore } from '@/stores/gameStore';

const gameStore = useGameStore()

// Mock tasks data - replace with your API call
const mockTasks = [
    { id: 1, title: "J'adore danser", color: "var(--color-green)" },
    { id: 2, title: "Reconnaître l'apiculteur", color: "var(--color-sky)" },
    { id: 3, title: "Repérer les plantes", color: "#1111" },
    { id: 4, title: "Éviter les ennemis", color: "#ffee00" },
    { id: 5, title: "Comprendre l'eau", color: "#11ddee" },
    { id: 6, title: "Trouver le pollen", color: "#ddee22" },
]

const markTaskAsCompleted = (taskId) => {
    if (!gameStore.isTaskCompleted(taskId)) {
        gameStore.markTaskAsCompleted(taskId)
    }
}

onMounted(() => {
    gameStore.setTasks(mockTasks)
})

</script>

<template>
    <div class="page-container with-navbar">
        <TheNavbar />
        <main class="full-width">
            <header class="page-header centered">
                <h1>Tâches</h1>
                <div class="progress-wrapper">
                    <span>{{ gameStore.tasksDone }}/{{ gameStore.totalTasks }}</span>
                    <BaseProgress class="border" :currentStep="gameStore.tasksDone"
                        :totalSteps="gameStore.totalTasks" />
                </div>
            </header>
            <section class="goal-header centered">
                <div class="goal-header-title">
                    <BaseIcon color="var(--color-brown)">
                        <IconCrown color="var(--color-orange)" />
                    </BaseIcon>
                    <div>
                        <h2>Quête</h2>
                        <h3>Retrouver l'essaim</h3>
                    </div>
                </div>
            </section>
            <section class="centered">
                <BaseTask v-for="(task, index) in gameStore.tasks" :key="task.id" tag="a" :href="task.href || 'clue'"
                    :color="task.color" :title="task.title" :isCompleted="gameStore.isTaskCompleted(task.id)"
                    @click.prevent="markTaskAsCompleted(task.id)" />
                <BaseTask color="var(--color-orange)" title="Ramener l'abeille"
                    :isLocked="!gameStore.isAllTasksCompleted" />
            </section>
        </main>
        <BgGrass />
    </div>
</template>

<style scoped>
main {
    max-width: var(--max-width);
    margin-left: auto;
    margin-right: auto;
}

.page-container {
    background-color: var(--color-sky);
    position: relative;
}

section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.page-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: var(--spacing-md) auto;
    margin-bottom: var(--spacing-lg);
}

.page-header h1 {
    margin: 0;
    font-size: var(--font-size-xl);
}

.progress-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-weight: 500;
}

.goal-header {
    display: flex;
    align-items: space-between;
    gap: var(--spacing-sm);
    margin: var(--spacing-md) auto var(--spacing-lg);
}

.goal-header-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.goal-header-title h2 {
    margin: 0;
    font-size: var(--font-size-xl);
    font-weight: 500;
}

.goal-header-title h3 {
    font-size: var(--spacing-md);
    font-family: Fredoka, sans-serif;
    font-weight: 400;
}
</style>
