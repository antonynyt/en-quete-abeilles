<script setup>
import BaseButton from './BaseButton.vue';
import IconBack from './icons/IconBack.vue';

</script>

<template>
    <BaseButton tag="button" type="button" class="button">
        <span class="visually-hidden">Retour</span>
        <IconBack />
    </BaseButton>

</template>

<style scoped>
.button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    max-width: fit-content;
}
</style>