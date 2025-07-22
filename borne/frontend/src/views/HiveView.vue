<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

</script>
<template>
    <div>
        <h1>{{ route.params.id }}</h1>
        <h2>Coutouuisdhsahinkj</h2>
    </div>
</template>

<style scoped>
div {
    background-color: var(--color-background);
    position: absolute;
    bottom: var(--spacing-md);
    right: var(--spacing-md);
    padding: var(--spacing-md);
}
</style>