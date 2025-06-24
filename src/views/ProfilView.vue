<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue';

</script>

<template>
    <div class="with-navbar container-spacing">
        <TheNavbar />
        <main>
            <h1>This is a profil page</h1>
        </main>
    </div>
</template>

<style scoped>
main {
    max-width: var(--max-width);
    margin-left: auto;
    margin-right: auto;
}
</style>
