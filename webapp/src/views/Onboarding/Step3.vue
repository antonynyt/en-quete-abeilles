<script setup>
import Step from './Step.vue'
</script>

<template>
    <Step>
        <template #illustrations>
            <img class="bee" src="../../assets/onboarding/bee-profil.svg" alt="">
        </template>
        <template #description>
            <h1>Une abeille s'est perdue</h1>
            <p>Distraite et rêveuse, une jeune abeille s'est perdue. Il faut dire que c'est la première fois qu'elle
                sort de la ruche et il y a tellement de choses à découvrir. Adopte cette abeille et aide-la à retrouver
                l'essaim!</p>
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