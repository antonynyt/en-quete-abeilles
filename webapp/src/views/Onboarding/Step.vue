<script setup>

defineProps({
    hillHeight: {
        type: String,
        default: "45%"
    }
});



</script>

<template>
    <div class="step">
        <div class="illustrations">
            <slot name="illustrations"></slot>
        </div>
        <div class="description">
            <div>
                <slot name="description"></slot>
            </div>
        </div>
    </div>
    <div class="green" aria-hidden="true"></div>
</template>

<style scoped>
.description,
.illustrations::before {
    background-color: var(--color-green);
}

.description>div,
.illustrations {
    max-width: var(--max-width);
    margin: 0 auto;
}

.step {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify stretch on very small screens */
    justify-content: stretch;
    height: 100%;
    width: 100%;
    position: relative;
}

@media only screen and (min-device-height: 460px) and (min-height: 460px) {
    .step {
        justify-content: space-between;
    }
}

/* Trick to expand the green behind the actions buttons */
.green {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 200px;
    background-color: var(--color-green);
    z-index: -1;
}

.illustrations {
    /* hidden on small screens */
    display: none;
    position: relative;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    min-height: 30vh;
}

@media only screen and (min-device-height: 460px) and (min-height: 460px) {
    .illustrations {
        display: flex;
    }
}

/* Hill background */
.illustrations::before {
    content: "";
    position: absolute;
    width: 180vw;
    height: v-bind(hillHeight);
    bottom: 0;
    background-color: var(--color-green);
    border-radius: 100% 100% 0 0;
    z-index: -1;
}

.description {
    width: 100%;
    height: 100%;
}

.description>div {
    padding: var(--spacing-lg) var(--spacing-md);
}

/* Responsive adjustments screen > 460px */
@media only screen and (min-device-height: 460px) and (min-height: 460px) {
    .description {
        height: auto;
    }

    .description>div {
        padding: var(--spacing-md);
        padding-bottom: 0;
    }
}

.description:global(p) {
    text-wrap-style: auto;
    max-width: 572px;
}

img {
    height: 100%;
}
</style>