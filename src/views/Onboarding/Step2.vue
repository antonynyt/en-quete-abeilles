<script setup>
import BgGrass from '@/components/BgGrass.vue';
</script>

<template>
    <div class="step">
        <div class="illustrations">
            <img class="hive" src="../../assets/onboarding/ruche.svg" alt="">
            <img class="bee1" src="../../assets/onboarding/bee-profil.svg" alt="">
            <img class="bee2" src="../../assets/onboarding/bee-profil.svg" alt="">
            <img class="bee3" src="../../assets/onboarding/bee-profil.svg" alt="">
            <img class="bee4" src="../../assets/onboarding/bee-profil.svg" alt="">
        </div>
        <header>
            <h1>La ruche est agitée!</h1>
            <p>La ruche est pleine, la moitié de la colonie s'apprête à partir avec l'ancienne Reine. C'est
                l'essaimage.
            </p>
            <p>Elles vont suivre la Reine et s'envelopper autour d'une branche en attendant de trouver une nouvelle
                maison.</p>
        </header>
        <BgGrass class="h-80" />
    </div>
</template>

<style scoped>
.step {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    gap: var(--spacing-xl);
}

.illustrations {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    min-height: 200px;
}

img {
    position: absolute;
}

.hive {
    width: 50vh;
    max-width: 200px;
}

.bee1 {
    top: 50px;
    right: 30px;
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
    right: 20%;
    width: 50px;
}


.bee4 {
    top: 10vh;
    left: 10%;
    width: 50px;
    transform: rotateY(180deg);
}
</style>