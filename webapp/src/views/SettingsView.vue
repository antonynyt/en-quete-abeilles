<script setup>
import BaseButton from '@/components/BaseButton.vue';
import IconCross from '@/components/icons/IconCross.vue';
import BaseIconLink from '@/components/BaseIconLink.vue';
import ThePageHeader from '@/components/ThePageHeader.vue';
import BaseModal from '@/components/BaseModal.vue';
import { onMounted, onUnmounted, ref } from 'vue';

const modal = ref()
const showModal = () => modal.value?.show()
const closeModal = () => modal.value?.close()
const isOnline = ref(navigator.onLine);

const updateOnlineStatus = () => {
    isOnline.value = navigator.onLine;
};

onMounted(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

onUnmounted(() => {
    window.removeEventListener('online', updateOnlineStatus);
    window.removeEventListener('offline', updateOnlineStatus);
});

const openResetModal = () => {
    showModal();
};

const resetApp = () => {
    localStorage.clear();
    window.location.replace('/');
};

</script>

<template>
    <div class="page-container">
        <BaseModal ref="modal">
            <h2>Supprimer ?</h2>
            <p>Attention, cette action supprime toute ta progression dans le parcours et les données de ton abeille.</p>
            <div class="modal-action-buttons">
                <BaseButton class="danger button" @click="resetApp">
                    Supprimer
                </BaseButton>
                <BaseButton @click="closeModal" class="button">
                    Annuler
                </BaseButton>
            </div>
        </BaseModal>
        <ThePageHeader title="Paramètres">
            <template #right-side>
                <BaseIconLink link="/profil" :icon="IconCross" label="Fermer" />
            </template>
        </ThePageHeader>
        <main class="full-width">

            <section class="centered app-info">
                <div class="app-info__item">
                    <span>Mode de l'application</span>
                    <span class="app-info__value"
                        :class="{ 'connection--online': isOnline, 'connection--offline': !isOnline }">
                        {{ isOnline ? 'En ligne' : 'Hors ligne' }}
                    </span>
                </div>
                <div class="app-info__item">
                    <span>Version</span>
                    <span class="app-info__value">
                        {{ '1.0.0' }}
                    </span>
                </div>
            </section>

            <section class="centered">
                <!-- TODO: Langues -->
                <!-- TODO: Vibrations Toggle-->
                <!-- TODO: Animations Toggle -->
                <BaseButton class="danger" @click="openResetModal">
                    Supprimer la progression
                </BaseButton>
            </section>

        </main>
    </div>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
}

section h2 {
    font-size: var(--font-size-md);
}

.modal-action-buttons {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: var(--spacing-sm);
}

.modal-action-buttons .button {
    width: auto;
    padding-left: var(--spacing-lg);
    padding-right: var(--spacing-lg);
}

.app-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-lg);
}

.app-info__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md);
    background-color: var(--color-beige-light);
    border-radius: var(--radius-sm);
}

.app-info__value {
    font-weight: 500;
}

.connection--online {
    color: var(--color-success, #28a745);
}

.connection--offline {
    color: var(--color-orange-electric, #dc3545);
}
</style>
