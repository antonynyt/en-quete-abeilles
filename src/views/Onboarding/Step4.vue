<script setup>
import { useBeeStore } from '@/stores/beeStore'
import { generateBeeName } from '@/utils/nameGenerator'

const bee = useBeeStore()
bee.name = generateBeeName() // initialize bee name in LocalStorage

</script>

<template>
    <div class="content">
        <div class="card">

            <div class="card-img">
                <img src="../../assets/bee-face.svg" alt="Abeille de face">
            </div>
            <div class="card-text">
                <div class="text-header">
                    <h2>{{ bee.name }}</h2>
                    <p>Niveau: {{ bee.level }}</p>
                </div>
                <p>
                    {{ bee.name }} est une jeune abeille inexperimentée. Parfois maladroite, elle rêve de devenir une
                    butineuse indispensable.
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

.card-img img {
    width: 90%;
    max-width: 25vh;
    z-index: 1;
}

.card-text {
    padding: 0 var(--spacing-md) var(--spacing-lg);
}

.card-text h2 {
    font-size: var(--font-size-xxl);
}

.text-header {
    margin-bottom: var(--spacing-md);
}
</style>