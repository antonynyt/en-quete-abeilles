<script setup>
import TheNavbar from '@/components/TheNavbar.vue';
import BaseTask from '@/components/BaseTask.vue';
import BaseProgress from '@/components/BaseProgress.vue';
import BgGrass from '@/components/BgGrass.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import IconCrown from '@/components/icons/IconCrown.vue';

</script>

<template>
    <div class="with-navbar container-spacing">
        <TheNavbar />
        <main>
            <header class="page-header">
                <h1>Tâches</h1>
                <div class="progress-wrapper">
                    <span>0/5</span>
                    <BaseProgress class="border" :currentStep="1" :totalSteps="5" />
                </div>
            </header>
            <section class="goal-header">
                <div class="goal-header-title">
                    <BaseIcon color="var(--color-brown)">
                        <IconCrown color="var(--color-orange)" />
                    </BaseIcon>
                    <div>
                        <h2>Quête</h2>
                        <h3>Retrouver l'essaim</h3>
                    </div>
                </div>
            </section>
            <section>
                <BaseTask href="clue" color="var(--color-green)" title="J'adore danser" :isCompleted=true />
                <BaseTask color="var(--color-sky)" title="Pollen et nectar" />
                <BaseTask color="var(--color-yellow)" title="Cultiver de bon légumes" />
                <BaseTask color="#33ddee" title="Apprendre l'apiculture" />
                <BaseTask color="var(--color-orange)" title="Ramener l'abeille" :isLocked=true />
            </section>
        </main>
        <BgGrass />
    </div>
</template>

<style scoped>
main {
    max-width: var(--max-width);
    margin-left: auto;
    margin-right: auto;
}

.container-spacing {
    background-color: var(--color-sky);
    position: relative;
}

section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.page-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
}

.page-header h1 {
    margin: 0;
}

.progress-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-weight: 500;
}

.goal-header {
    display: flex;
    align-items: space-between;
    gap: var(--spacing-sm);
    margin: var(--spacing-md) auto var(--spacing-lg);
}

.goal-header-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.goal-header-title h2 {
    margin: 0;
    font-size: var(--font-size-xl);
}

.goal-header-title h3 {
    font-size: var(--spacing-md);
    font-family: Fredoka, sans-serif;
    font-weight: 400;
}
</style>
