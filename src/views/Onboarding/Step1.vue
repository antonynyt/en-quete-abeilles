<script setup>
import BgGrass from '@/components/BgGrass.vue';
</script>

<template>
    <div class="step">
        <div class="img-wrapper">
            <img src="../../assets/onboarding/cca-building.svg"
                alt="Bâtiment du Centre de Compétence en Apiculture avec deux ruches dans le jardin" />
        </div>
        <header>
            <h1>Bienvenue au Centre de Compétence en Apiculture</h1>
            <p>Les abeilles sont heureuses. Elles volent à la recherche du pollen et nectar des plantes.</p>
        </header>
        <BgGrass />
    </div>
</template>

<style scoped>
.step {
    margin-top: auto;
}

img {
    position: absolute;
    bottom: 47vh;
    right: -30px;
    width: 100%;
    max-width: 500px;
    align-self: center;
}
</style>