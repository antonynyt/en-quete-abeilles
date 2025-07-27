<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import IconRefresh from '@/components/icons/IconRefresh.vue'
import TheBee from '@/components/TheBee.vue'
import { useBeeStore } from '@/stores/beeStore'
import { generateBeeName, generateCaracterTrait, generateEnnemyTrait, generateFlowerTrait } from '@/utils/beeGenerator'

const bee = useBeeStore()

const beeInfo = () => {
    bee.name = generateBeeName()
    bee.trait1 = generateCaracterTrait().toLowerCase()
    bee.trait2 = generateCaracterTrait().toLowerCase()

    while (bee.trait1 === bee.trait2) {
        bee.trait2 = generateCaracterTrait().toLowerCase()
    }

    bee.flower = generateFlowerTrait().toLowerCase()
    bee.enemy = generateEnnemyTrait().toLowerCase()
}

if (!localStorage.getItem('beeinfo')) {
    beeInfo()
}

bee.resetBee = () => {
    beeInfo()
}

</script>

<template>
    <div class="content">
        <div class="card">

            <div class="card-img">
                <TheBee />
            </div>
            <div class="card-text">
                <div class="text-header">
                    <div>
                        <h2>{{ bee.name }}</h2>
                        <p>{{ bee.level }}</p>
                    </div>
                    <BaseButton @click="bee.resetBee" class="reset-button" aria-label="Réinitialiser l'abeille">
                        <IconRefresh />
                    </BaseButton>
                </div>
                <p>
                    {{ bee.name }} est une jeune abeille {{ bee.trait1 }} et un peu {{ bee.trait2 }}. Elle adore {{
                        bee.flower }} mais est
                    terrifiée des {{ bee.enemy }}.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content {
    padding: var(--spacing-md);
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    max-width: var(--max-width);
    margin: 0 auto;

}

.card {
    border: var(--border-size) solid var(--color-beige);
    box-shadow:
        inset 0 calc(-1* var(--border-size) * 2) 0 var(--color-beige);
    width: 100%;
    height: 100%;
    border-radius: var(--radius-sm);
    background-color: var(--color-beige-light);

    display: grid;
    grid-template-rows: 1fr min-content;
    grid-template-columns: 100%;
    gap: var(--spacing-lg);
    overflow: hidden;
}

.card-img {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-sky);
    overflow: hidden;
    position: relative;
}

.card-img::before {
    content: "";
    position: absolute;
    top: 55%;
    width: 200%;
    height: 100%;
    background-color: var(--color-beige-light);
    border-radius: 50%;
}

.card-img :deep(svg) {
    width: 90%;
    max-width: 25vh;
    height: auto;
    z-index: 1;
}

.card-text {
    padding: 0 var(--spacing-md) var(--spacing-lg);
}

.card-text h2 {
    font-size: var(--font-size-xl);
}

.text-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-md);
}

.reset-button {
    z-index: 2;
    height: 100%;
    width: auto;
}
</style>