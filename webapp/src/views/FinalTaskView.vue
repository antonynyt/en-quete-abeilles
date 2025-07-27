<script setup>
import IconBack from '@/components/icons/IconBack.vue';
import BaseIconLink from '@/components/BaseIconLink.vue';
import { useStrapiApi } from '@/composables/useStrapiApi'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import ThePageHeader from '@/components/ThePageHeader.vue';
import BaseButton from '@/components/BaseButton.vue';
import ClueImage from '@/components/ClueImage.vue';
import BaseModal from '@/components/BaseModal.vue';
import TheQR from '@/components/TheQR.vue';

const router = useRouter()

const { getFinalTask } = useStrapiApi()
const task = ref(null)
const qrModal = ref(null)

const loadTask = async () => {
    try {
        const response = await getFinalTask()
        // remap the response to match the expected structure
        task.value = {
            id: response.data.documentId,
            title: response.data.title,
            description: response.data.clue.description,
            fact: response.data.clue.fact,
            image: response.data.clue.image,
        }
        if (!task.value) {
            throw new Error('Task not found')
        }
    } catch (err) {
        console.error('Failed to load task:', err)
        router.push({ name: 'NotFound' })
    }
}

const goBack = () => {
    router.go(-1)
}

const showQR = () => {
    qrModal.value?.show()
}

onMounted(() => {
    loadTask()
})

//TODO: refactor to use the same view as clue detail
</script>

<template>
    <div v-if="task" class="clue-detail">
        <BaseModal ref="qrModal" class="qr-modal">
            <h2>Code abeille</h2>
            <div class="qr-container">
                <TheQR />
            </div>
        </BaseModal>

        <ThePageHeader title="Indice" class="clue-detail__header">
            <template #left-side>
                <div class="clue-detail__header-left">
                    <BaseIconLink link="/tasks" @click.prevent="goBack" :icon="IconBack" label="Retour" />
                    <p class="clue-detail__header-text">Tâche finale</p>
                </div>
            </template>
        </ThePageHeader>

        <main class="clue-detail__main">
            <header class="clue-detail__content-header">
                <div class="centered">
                    <h1 class="clue-detail__title">{{ task.title }}</h1>
                    <p class="clue-detail__description">Félicitation ! Toutes les tâches sont terminées. Ramène
                        l'abeille.
                    </p>
                </div>
            </header>

            <section class="clue-detail__section centered">
                <h2 class="clue-detail__section-title">Indice</h2>
                <p class="clue-detail__section-text">{{ task.description }}</p>
            </section>

            <section class="clue-detail__section centered">
                <h2 class="clue-detail__section-title">Fait amusant</h2>
                <p class="clue-detail__section-text">{{ task.fact }}</p>
            </section>

            <section class="clue-detail__section clue-detail__section--image centered">
                <h2 class="clue-detail__section-title">Photo du lieu</h2>
                <ClueImage :task="task" />
            </section>
        </main>

        <div class="clue-detail__actions centered">
            <BaseButton @click="showQR" class="clue-detail__action-button primary">
                Afficher le code abeille
            </BaseButton>
        </div>
    </div>
</template>

<style scoped>
.qr-modal {
    padding-top: var(--spacing-md);
}

.qr-container {
    width: 100%;
    height: 100%;
    padding: var(--spacing-md);
    display: flex;
    justify-content: center;
    align-items: center;
}


.clue-detail__header,
.clue-detail__content-header {
    background-color: var(--color-green);
}

.clue-detail__header {
    position: fixed;
    z-index: 999;
}

.clue-detail__header-left {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.clue-detail__header-text {
    margin: 0;
    font-size: var(--font-size-md);
}

.clue-detail__content-header {
    padding: var(--spacing-lg) 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: var(--spacing-sm);
    padding-bottom: var(--spacing-xl);
    padding-top: 5rem;
}

.clue-detail__content-header::before {
    content: "";
    position: absolute;
    bottom: -90%;
    width: 400%;
    height: 100%;
    background-color: var(--color-background);
    border-radius: 50%;
    z-index: 1;
}

.clue-detail__section {
    margin-bottom: var(--spacing-lg);
}

.clue-detail__section--image {
    margin-bottom: calc(7rem + env(safe-area-inset-bottom));
}

.clue-detail__section-title {
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-lg);
}

.clue-detail__actions {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom));
}
</style>
