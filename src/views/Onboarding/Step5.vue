<script setup>
import Step from './Step.vue'
</script>

<template>
    <Step :hillHeight="('65%')">
        <template #illustrations>
            <img class="path" src="../../assets/onboarding/guide-path.svg" alt="">
        </template>
        <template #description>
            <h1>Vite, suivez l’essaim</h1>
            <p>Votre objectif est d’effectuer les tâches sur votre chemin pour terminer la quête.</p>
        </template>
    </Step>
</template>

<style scoped>
.img-wrapper {
    background-color: var(--color-sky);
}

.path {
    position: absolute;
    width: 95%;
    max-width: 550px;
    right: 0;
    min-width: 200px;
    height: 100%;
}
</style>