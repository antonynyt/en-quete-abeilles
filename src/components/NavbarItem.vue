<script setup>
const props = defineProps({
    href: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

const vibrate = () => {
    if ('vibrate' in navigator) {
        navigator.vibrate(1);
    }
};


</script>

<template>
    <RouterLink :to="href" active-class="active" @click="vibrate">
        <div class="icon">
            <slot></slot>
        </div>
        {{ title }}
    </RouterLink>
</template>

<style scoped>
a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1 1 0px;
    font-size: var(--font-size-xs);
    font-family: 'Pally', sans-serif;
    font-weight: 500;
    color: inherit;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
}

.active {
    background-color: var(--color-beige-light);
    outline: var(--border-size) solid var(--color-beige);
    outline-offset: calc(-1 * var(--border-size));
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--font-size-xxl);
    height: var(--font-size-xxl);
    width: 2.2rem;
    height: 2.2rem;
}
</style>