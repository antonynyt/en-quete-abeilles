<script setup>
import Step from './Step.vue'
</script>

<template>
    <Step>
        <template #illustrations>
            <img src="../../assets/onboarding/cca-building.svg"
                alt="Bâtiment du Centre de Compétence en Apiculture avec deux ruches dans le jardin" />
        </template>
        <template #description>
            <header>
                <h1>Bienvenue au Centre de Compétence en Apiculture</h1>
                <p>Les abeilles sont heureuses. Elles volent à la recherche du pollen et nectar des plantes.</p>
            </header>
        </template>
    </Step>
</template>

<style scoped>
img {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 90%;
    max-width: 550px;
    height: 100%;
}
</style>