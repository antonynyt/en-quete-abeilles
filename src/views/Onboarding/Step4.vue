<script setup>
import Step from './Step.vue'
</script>

<template>
    <div class="content">
        <div class="card">

            <div class="card-img">
                <img src="../../assets/bee-face.svg" alt="Abeille de face">
            </div>
            <div class="card-text">
                <div class="text-header">
                    <h2>LavandeCurieuse</h2>
                    <p>Role: Novice</p>
                </div>
                <p>
                    LavandeCurieuse est une jeune abeille inexperimentée. Parfois maladroite, elle rêve de devenir une
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

    max-width: 732px;
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
    grid-template-rows: 2fr 1fr;
    grid-template-columns: 100%;
    gap: var(--spacing-lg);

}

.card-img {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-sky);
}

.card-img img {
    width: 90%;
    max-width: 210px;
}

.card-text {
    padding: 0 var(--spacing-lg) var(--spacing-lg);
}
</style>