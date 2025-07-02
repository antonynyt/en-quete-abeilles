<script setup>
import { onMounted } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import BaseTask from '@/components/BaseTask.vue';
import BaseProgress from '@/components/BaseProgress.vue';
import ThePageHeader from '@/components/ThePageHeader.vue';
import BgGrass from '@/components/BgGrass.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import IconCrown from '@/components/icons/IconCrown.vue';
import { useGameStore } from '@/stores/gameStore';
import { useStrapiApi } from '@/composables/useStrapiApi';

const gameStore = useGameStore()
const { getTasks, loading, error } = useStrapiApi()

const loadTasks = async () => {
    try {
        const response = await getTasks()
        const tasks = response.data.map(task => ({
            id: task.documentId,
            title: task.title,
            color: task.color || '#1111',
            slug: task.slug
        }))
        gameStore.setTasks(tasks)
    } catch (err) {
        console.error('Failed to load tasks:', err)
    }
}

onMounted(() => {
    loadTasks()
})

</script>

<template>
    <div class="page-container with-navbar">
        <TheNavbar />
        <main class="full-width">
            <ThePageHeader title="Tâches">
                <template #right-side>
                    <div class="progress-wrapper">
                        <span>{{ gameStore.tasksDone }}/{{ gameStore.totalTasks }}</span>
                        <BaseProgress class="border" :currentStep="gameStore.tasksDone"
                            :totalSteps="gameStore.totalTasks" />
                    </div>
                </template>
            </ThePageHeader>
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
                <BaseTask v-for="(task, index) in gameStore.tasks" :key="task.id" :href="`/tasks/${task.slug}`"
                    :color="task.color" :title="task.title" :isCompleted="gameStore.isTaskCompleted(task.id)" />
                <BaseTask color="var(--color-brown)" title="Ramener l'abeille"
                    :isLocked="!gameStore.isAllTasksCompleted">
                    <template #icon>
                        <IconCrown color="var(--color-orange)" />
                    </template>
                </BaseTask>
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
