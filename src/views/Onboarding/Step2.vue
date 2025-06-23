<script setup>
import Step from './Step.vue';
</script>

<template>
    <Step>
        <template #illustrations>
            <img class="hive" src="../../assets/onboarding/ruche.svg" alt="">
            <img class="bee1" src="../../assets/onboarding/bee-profil.svg" alt="">
            <img class="bee2" src="../../assets/onboarding/bee-profil.svg" alt="">
            <img class="bee3" src="../../assets/onboarding/bee-profil.svg" alt="">
            <img class="bee4" src="../../assets/onboarding/bee-profil.svg" alt="">
        </template>
        <template #description>
            <h1>La ruche est agitée!</h1>
            <p>La ruche est pleine, la moitié de la colonie s'apprête à partir avec l'ancienne Reine. C'est
                l'essaimage.
            </p>
            <p>Elles vont suivre la Reine et s'envelopper autour d'une branche en attendant de trouver une nouvelle
                maison.</p>
        </template>
    </Step>
</template>

<style scoped>
img {
    position: absolute;
}

.hive {
    width: 50vh;
    max-width: 250px;
    height: 100%;
}

.bee1 {
    top: 5vh;
    right: 35%;
    width: 30px;
    transform: rotateY(180deg);
}

.bee2 {
    top: 25vh;
    right: 50%;
    width: 20px;
    transform: rotateY(180deg);
}


.bee3 {
    /* top: 25vh; */
    right: 15%;
    width: 40px;
}


.bee4 {
    top: 15vh;
    left: 10%;
    width: 50px;
    transform: rotateY(180deg);
}
</style>