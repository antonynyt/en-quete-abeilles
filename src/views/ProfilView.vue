<script setup>
import TheBee from '@/components/TheBee.vue';
import TheNavbar from '@/components/TheNavbar.vue';
</script>

<template>
    <div class="page-container with-navbar">
        <main>
            <section class="avatar-section">
                <div class="centered avatar-container">
                    <TheBee />
                </div>
            </section>
            <header class="centered">
                <h1>LavandeCurieuse</h1>
                <p>Bienvenue sur votre profil !</p>
            </header>
        </main>
        <TheNavbar />
    </div>
</template>

<style scoped>
.avatar-section {
    background-color: var(--color-sky);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: var(--spacing-lg) 0;
    min-height: 40vh;
}

.avatar-section::before {
    content: "";
    position: absolute;
    top: 55%;
    width: 200%;
    height: 100%;
    background-color: var(--color-background);
    border-radius: 50%;
}

.avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatar-container :deep(svg) {
    width: 40%;
    min-width: 240px;
    height: auto;
    z-index: 1;
}
</style>
