<script setup>
import BaseIconLink from '@/components/BaseIconLink.vue';
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ThePageHeader from '@/components/ThePageHeader.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useGameStore } from '@/stores/gameStore';
import ObjectiveLi from '@/components/ObjectiveLi.vue';
import IconCross from '@/components/icons/IconCross.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import IconFlag from '@/components/icons/IconFlag.vue';
import TheQuiz from '@/components/TheQuiz.vue';
import { useTask } from '@/composables/useTask';

const gameStore = useGameStore()
const route = useRoute()
const router = useRouter()

const { task, bgColor, loadTask } = useTask()
const quizComponent = ref(null)

const isTaskDone = computed(() => {
    return gameStore.isTaskCompleted(route.params.id)
})

const goBack = () => {
    router.back()
}

const showQuiz = () => {
    quizComponent.value?.loadQuiz()
}

const handleTaskLoad = async () => {
    try {
        await loadTask(route.params.id)
    } catch (err) {
        router.push({
            name: 'NotFound',
            params: { pathMatch: route.path.substring(1).split('/') },
            query: route.query,
            hash: route.hash,
        })
    }
}

onMounted(() => {
    handleTaskLoad()
})
</script>

<template>
    <div class="task-detail">
        <TheQuiz v-if="task" ref="quizComponent" :task-id="task?.id" />

        <ThePageHeader title="Tâche" class="task-detail__header">
            <template #left-side>
                <div class="task-detail__header-left">
                    <BaseIcon :color="task?.color" class="task-detail__icon">
                        <IconFlag />
                    </BaseIcon>
                    <p class="task-detail__header-text">Tâche</p>
                </div>
            </template>
            <template #right-side>
                <BaseIconLink @click="goBack" link="/tasks" :icon="IconCross" label="Fermer" />
            </template>
        </ThePageHeader>

        <main class="task-detail__main">
            <header class="task-detail__content-header">
                <div class="centered">
                    <h1 class="task-detail__title">{{ task?.title }}</h1>
                    <p class="task-detail__description">{{ task?.description }}</p>
                </div>
                <div class="task-detail__objectives centered">
                    <h2 class="task-detail__objectives-title">Objectifs</h2>
                    <ul class="task-detail__objectives-list">
                        <ObjectiveLi v-for="(objective, index) in task?.objectives" :key="index">
                            {{ objective.listElement }}
                        </ObjectiveLi>
                    </ul>
                </div>
            </header>

            <section class="task-detail__main-section centered">
                <h2 class="task-detail__section-title">Explications</h2>
            </section>

            <section class="task-detail__main-section centered">
                <h2 class="task-detail__section-title">Ta tâche</h2>
                <p></p>
            </section>
        </main>

        <div class="task-detail__action-button centered">
            <BaseButton class="primary" @click="showQuiz">
                {{ isTaskDone ? 'Voir le résultat du Quiz' : 'Répondre au Quiz' }}
            </BaseButton>
        </div>
    </div>
</template>

<style scoped>
.task-detail__header {
    background-color: v-bind('bgColor');
    position: fixed;
    z-index: 999;
}

.task-detail__header-left {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.task-detail__header-text {
    margin: 0;
    font-size: var(--font-size-md);
}

.task-detail__content-header {
    background-color: v-bind('bgColor');
    padding: var(--spacing-lg) 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: var(--spacing-sm);
    padding-bottom: var(--spacing-xl);
    padding-top: 5rem;
}

.task-detail__content-header::before {
    content: "";
    position: absolute;
    bottom: -90%;
    width: 400%;
    height: 100%;
    background-color: var(--color-background);
    border-radius: 50%;
    z-index: 1;
}

.task-detail__main-section {
    margin-bottom: var(--spacing-lg);
}

.task-detail__section-title {
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-lg);
}

.task-detail__objectives {
    padding-top: var(--spacing-lg);
    padding-bottom: var(--spacing-md);
}

.task-detail__objectives-title {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-sm);
}

.task-detail__objectives-list {
    padding-left: 1.5em;
}

.task-detail__action-button {
    padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom));
}

.task-detail__icon {
    width: 2rem;
    height: 2rem;
}
</style>
