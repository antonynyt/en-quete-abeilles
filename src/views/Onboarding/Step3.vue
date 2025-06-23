<script setup>
import BgGrass from '@/components/BgGrass.vue';
</script>

<template>
    <div class="step">
        <div class="img-wrapper">
            <img src="../../assets/onboarding/bee-profil.svg" alt="">
        </div>
        <header>
            <h1>Une abeille semble perdue.</h1>
            <p>Une abeille est désorientée à cause des pesticides. Elle a perdu la notion de l’espace et son
                intelligence est ralentie. Aidez-la !</p>
        </header>
        <!-- <BgGrass class="h-80" /> -->
    </div>
</template>

<style scoped>
.img-wrapper {
    background-color: var(--color-sky);
}

.step {
    margin-top: auto;
}

img {
    position: absolute;
    bottom: 50vh;
    width: 100%;
    max-width: 30vh;
    min-width: 200px;
    align-self: center;
}
</style>