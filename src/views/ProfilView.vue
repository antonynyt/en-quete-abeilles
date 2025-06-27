<script setup>
import BaseButton from '@/components/BaseButton.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import ProgressCard from '@/components/ProgressCard.vue';
import TheBee from '@/components/TheBee.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import { useBeeStore } from '@/stores/beeStore';
const bee = useBeeStore()

</script>

<template>
    <div class="page-container with-navbar">
        <header class="full-width page-header-container">
            <div class="page-header centered">
                <h1>Profil</h1>
                <IconSettings class="settings-icon" />
            </div>
        </header>
        <main>
            <section class="avatar-section">
                <div class="centered avatar-container">
                    <TheBee />
                </div>
            </section>
            <section class="centered bee-info">
                <h2>{{ bee.name }}</h2>
                <p>{{ bee.level }}</p>
            </section>
            <section class="centered goal-section">
                <p>Lors de l'essaimage d'une ruche, vous avez adopté une abeille déboussolée. Aidez-la à retrouver son
                    groupe.</p>
                <ProgressCard />
            </section>
            <section class="centered learn-section">
                <h2>Apprendre</h2>
                <BaseButton tag="a" href="/tasks">
                    En savoir plus sur l'essaimage
                </BaseButton>
            </section>
        </main>
        <TheNavbar />
    </div>
</template>

<style scoped>
.page-header-container {
    background-color: var(--color-sky);
}

.page-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--spacing-md);
}

.page-header h1 {
    margin: 0;
    font-size: var(--font-size-xl);
}

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

.bee-info {
    margin-bottom: var(--spacing-lg);
}

.goal-section {
    margin-bottom: var(--spacing-xl);
}

.goal-section,
.learn-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.learn-section h2 {
    margin: 0;
    font-size: var(--font-size-lg);
}
</style>
