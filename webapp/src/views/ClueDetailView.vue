<script setup>
import IconBack from '@/components/icons/IconBack.vue';
import BaseIconLink from '@/components/BaseIconLink.vue';
import { useStrapiApi } from '@/composables/useStrapiApi'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ThePageHeader from '@/components/ThePageHeader.vue';
import BaseButton from '@/components/BaseButton.vue';
import { lightenHexColor } from '@/utils/color';
import ClueImage from '@/components/ClueImage.vue';
import TheScanner from '@/components/TheScanner.vue';
import { useGameStore } from '@/stores/gameStore';

const gameStore = useGameStore()
const route = useRoute()
const router = useRouter()

const scanner = ref(false)

const { getTaskBySlug } = useStrapiApi()
const task = ref(null)

const loadTask = async () => {
    try {
        const response = await getTaskBySlug(route.params.slug)
        // remap the response to match the expected structure
        task.value = {
            id: response.data.documentId,
            title: response.data.title,
            description: response.data.clue.description,
            fact: response.data.clue.fact,
            image: response.data.clue.image,
            color: response.data.color || '#1111',
        }
        if (!task.value) {
            throw new Error('Task not found')
        }
    } catch (err) {
        console.error('Failed to load task:', err)
        router.push({ name: 'NotFound' })
    }
}

const bgColor = computed(() => {
    if (!task.value) return '#ffffff'
    return lightenHexColor(task.value.color, 0.6)
})

const openScanner = () => {
    scanner.value = true
}

const closeScanner = () => {
    scanner.value = false
}

const goBack = () => {
    router.go(-1)
}

onMounted(() => {
    loadTask()
})

</script>

<template>
    <div v-if="scanner" class="page-container">
        <TheScanner @close="closeScanner" :showCloseBtn="true" />
    </div>
    <div v-else-if="task" class="page-container">
        <ThePageHeader title="Indice" class="page-header-container">
            <template #left-side>
                <div class="left-side">
                    <BaseIconLink link="/tasks" @click.prevent="goBack" :icon="IconBack" label="Retour" />
                    <p class="pally">Indice</p>
                </div>
            </template>
        </ThePageHeader>
        <main>
            <header class="page-content-header">
                <div class="centered">
                    <h1>{{ task.title }}</h1>
                    <p>Pour commencer, déplace toi vers la tâche à l'aide de l'indice.</p>
                </div>
            </header>
            <section class="centered">
                <h2>Indice</h2>
                <p>{{ task.description }}</p>
            </section>
            <section class="centered">
                <h2>Fait amusant</h2>
                <p>{{ task.fact }}</p>
            </section>
            <section class="centered clue-image-section">
                <h2>Photo du lieu</h2>
                <ClueImage :task="task" />
            </section>
        </main>
        <div class="centered action-button">
            <BaseButton v-if="gameStore.isTaskScanned(task.id)" :to="`/t/${task.id}`">
                Ouvrir la tâche
            </BaseButton>
            <BaseButton v-else @click="openScanner" class="primary">
                Ouvrir le scanner
            </BaseButton>
        </div>
    </div>
</template>

<style scoped>
.page-header-container,
.page-content-header {
    background-color: v-bind('bgColor');
}

.page-header-container .left-side {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.page-header-container .left-side p {
    margin: 0;
}

.page-content-header {
    padding: var(--spacing-lg) 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-xl);
}

.page-content-header::before {
    content: "";
    position: absolute;
    bottom: -90%;
    width: 200%;
    height: 100%;
    background-color: var(--color-background);
    border-radius: 50%;
    z-index: 1;
}

main>section {
    margin-bottom: var(--spacing-lg);
}

main>section h2 {
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-lg);
}

.clue-image-section {
    margin-bottom: calc(5.5rem + env(safe-area-inset-bottom));
}

.action-button {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom));
}
</style>
