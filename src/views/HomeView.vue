<script setup>
import TheNavbar from '@/components/TheNavbar.vue';
import BaseTask from '@/components/BaseTask.vue';
import BaseProgress from '@/components/BaseProgress.vue';
import BaseButton from '@/components/BaseButton.vue';
import BackButton from '@/components/BaseButtonBack.vue';

</script>

<template>
    <div class="with-navbar container-spacing">
        <TheNavbar />
        <main>
            <header>
                <h1>Tâches</h1>
                <div>
                    <BaseProgress :currentStep="1" :totalSteps="5" />
                </div>
            </header>
            <BaseButton tag="button" type="button" @click="test" class="primary">Commencer l'aventure</BaseButton>
            <BaseButton tag="a" @click="test" href="scanner">Commencer l'aventure</BaseButton>

            <div>
                <BackButton />
                <BaseButton tag="button" type="button" @click="test">Voler l'abeille</BaseButton>
            </div>
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
        </main>
    </div>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

main>div {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-md);
}
</style>
