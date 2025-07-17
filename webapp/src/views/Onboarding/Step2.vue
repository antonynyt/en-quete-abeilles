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
            <h1>Cette ruche s'agite!</h1>
            <p>La ruche est très populeuse, une partie de la colonie s'apprête à partir avec la Reine. C'est
                l'essaimage.</p>
            <p>Elles s'envolent et suivent la Reine. En attendant de trouver une nouvelle maison, elles se posent
                sur une branche et forme une grande grappe d'abeilles.</p>
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