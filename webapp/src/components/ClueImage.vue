<script setup>
import StrapiImage from './StrapiImage.vue';

const props = defineProps({
    task: {
        type: Object,
        required: true,
    },
});

</script>

<template>
    <div class="clue-image-container">
        <div class="overlay">
            <p>
                Maintiens appuyé sur l'image pour la solution.
            </p>
        </div>
        <StrapiImage :imageData="task.image" :alt="task.title" format="medium" imageClass="clue-image" />
    </div>
</template>

<style scoped>
.clue-image-container {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4/3;
    border-radius: 8px;
    border: 2px solid var(--color-brown);
    object-fit: cover;
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    margin: var(--spacing-md) 0;
}

.clue-image-container:active {
    cursor: grabbing;
}

.clue-image {
    width: 100%;
    height: auto;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    pointer-events: none;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-brown);
    display: flex;
    justify-content: center;
    align-items: center;
}

@supports (backdrop-filter: blur()) {
    .overlay {
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(5rem);
    }
}

.overlay:active {
    visibility: hidden;
    pointer-events: none;
    animation: hideOverlay 1s linear forwards;
}

.overlay p {
    background-color: var(--color-beige-light);
    padding: var(--spacing-sm) var(--spacing-md);
    margin: var(--spacing-md);
    border-radius: var(--radius-sm);
    position: relative;
    overflow: hidden;
    text-align: center;
    z-index: 1;
}

.overlay:active p::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: var(--color-beige);
    animation: fillBar 1s linear forwards;
    z-index: -1;
}

@keyframes fillBar {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}

@keyframes hideOverlay {
    0% {
        visibility: visible;
    }

    99% {
        visibility: visible;
    }

    100% {
        visibility: hidden;
    }

}
</style>