<script setup>
import { defineProps } from 'vue'
import IconFlag from './icons/IconFlag.vue';
import BaseIcon from './BaseIcon.vue';
import IconCheckmark from './icons/IconCheckmark.vue';
import IconLock from './icons/IconLock.vue';
import router from '@/router';

const props = defineProps({
    color: {
        type: String,
        default: 'var(--color-primary)'
    },
    title: {
        type: String,
        default: 'Task Title'
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    href: {
        type: String,
        default: '#'
    }
})

const processClick = () => {
    if ('vibrate' in navigator) {
        navigator.vibrate(1);
    }
    router.push(props.href);
}

</script>

<template>
    <a v-if="isLocked" href.prevent="#" class="locked">
        <div class="wrapper">
            <BaseIcon :color="color">
                <IconFlag />
            </BaseIcon>
            <h2>{{ title }}</h2>
            <div class="status">
                <IconLock />
            </div>
        </div>
    </a>

    <a v-else :href="href" class="button" @click.prevent="processClick">
        <div class="wrapper">
            <BaseIcon :color="color">
                <IconFlag />
            </BaseIcon>
            <h2>{{ title }}</h2>
            <div class="status">
                <div class="icon" :class="{ checked: isCompleted }">
                    <IconCheckmark />
                </div>
                <span class="visually-hidden"> {{ (isCompleted == true ? 'Terminée' : 'Pas terminée') }}</span>
            </div>
        </div>
    </a>

</template>

<style scoped>
a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    /* inherit from button class */
    padding: var(--spacing-sm);
    border-color: var(--color-beige);
    border-radius: var(--radius-md);
    box-shadow: 0 calc(var(--border-size)*2) 0 var(--color-beige);
}

.locked {
    background-color: var(--color-beige);
    box-shadow: none;
    margin-bottom: calc(1px - var(--border-size) * 2);
}

.locked .status {
    color: var(--color-brown);
}

.wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    background-color: var(--color-secondary);
    color: var(--color-text);
}

h2 {
    font-size: var(--font-size-md);
    text-wrap: wrap;
    text-align: left;
}

.status {
    display: flex;
    align-items: center;
    margin-left: auto;
    flex-shrink: 0;
}

.status .icon {
    display: flex;
    place-content: center;
    place-items: center;
    width: 32px;
    height: 32px;
    color: var(--color-beige);
    border-radius: 50%;
    border: var(--border-size) solid var(--color-beige);
}

.status .checked {
    color: var(--color-text);
    background-color: var(--color-green);
    border-color: var(--color-green);
}
</style>