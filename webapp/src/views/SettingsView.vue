<script setup>
import BaseButton from '@/components/BaseButton.vue';
import IconCross from '@/components/icons/IconCross.vue';
import BaseIconLink from '@/components/BaseIconLink.vue';
import ThePageHeader from '@/components/ThePageHeader.vue';
import BaseModal from '@/components/BaseModal.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const modal = ref()
const showModal = () => modal.value?.show()
const closeModal = () => modal.value?.close()

const openResetModal = () => {
    showModal();
};

const resetApp = () => {
    localStorage.clear();
    router.push('/');
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
</style>
