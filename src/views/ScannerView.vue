<script setup lang="ts">
import BaseButtonBack from '@/components/BaseButtonBack.vue';
import TheNavbar from '@/components/TheNavbar.vue';

</script>

<template>
    <div class="with-navbar container-spacing">
        <TheNavbar />
        <main>
            <BaseButtonBack />
            <h1>This is a scanner page</h1>
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
