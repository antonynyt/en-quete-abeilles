<script setup>
import Step from './Step.vue'
</script>

<template>
    <div class="content">
        <div class="card">

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
}
</style>