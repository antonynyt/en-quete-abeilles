<script setup>
import TheNavbar from '@/components/TheNavbar.vue';
import BaseTask from '@/components/BaseTask.vue';
import BaseProgress from '@/components/BaseProgress.vue';
import BaseButton from '@/components/BaseButton.vue';
import BackButton from '@/components/BaseButtonBack.vue';
import BgGrass from '@/components/BgGrass.vue';

</script>

<template>
    <main class="with-navbar container-spacing">
        <TheNavbar />
        <header class="page-header">
            <h1>Tâches</h1>
            <div class="progress-wrapper">
                <span>0/5</span>
                <BaseProgress class="border" :currentStep="1" :totalSteps="5" />
            </div>
        </header>
        <section>
            <BaseButton tag="a" href="/onboarding">Commencer l'aventure</BaseButton>
            <BaseTask href="clue" color="var(--color-green)" title="J'adore danser" :isCompleted=true />
            <BaseTask color="var(--color-sky)" title="Pollen et nectar" />
            <BaseTask color="var(--color-sky)" title="La drogue de la vie" />
            <BaseTask color="var(--color-sky)" title="La drogue de la vie" />
            <BaseTask color="var(--color-sky)" title="La drogue de la vie" />
            <BaseTask color="var(--color-sky)" title="La drogue de la vie" />
            <BaseTask title="Brûler l'abeille" />
            <BaseTask title="Brûler l'abeille" />
            <BaseTask title="Brûler l'abeille" />
            <BaseTask title="Brûler l'abeille" />
            <BaseTask title="Brûler l'abeille" />
            <BaseTask title="Brûler l'abeille" />
            <BaseTask title="Brûler l'abeille" />
            <BaseTask title="Brûler l'abeille" />
            <BaseTask color="var(--color-orange)" title="Ramener l'abeille" :isLocked=true />
        </section>
        <BgGrass class="h-80" />
    </main>
</template>

<style scoped>
.container-spacing {
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
    margin-bottom: var(--spacing-md);
}

.page-header h1 {
    margin: 0;
}

.progress-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-weight: 500;
}
</style>
