<script setup>
import Step from './Step.vue'
</script>

<template>
    <Step>
        <template #illustrations>
            <img class="bee" src="../../assets/onboarding/bee-profil.svg" alt="">
        </template>
        <template #description>
            <h1>Une abeille semble perdue.</h1>
            <p>Une abeille est désorientée à cause des pesticides. Elle a perdu la notion de l’espace et son
                intelligence est ralentie. Aide-la !</p>
        </template>
    </Step>
</template>

<style scoped>
.img-wrapper {
    background-color: var(--color-sky);
}

.bee {
    position: absolute;
    width: 100%;
    max-width: 30vh;
    min-width: 200px;
    align-self: center;
}
</style>