<script setup>
import TheNavbar from '@/components/TheNavbar.vue';
import TheScanner from '@/components/TheScanner.vue';

</script>

<template>
    <div class="with-navbar page-container">
        <TheNavbar />
        <main>
            <TheScanner />
        </main>
    </div>
</template>

<style scoped>
.with-navbar {
    position: relative;
}
</style>
