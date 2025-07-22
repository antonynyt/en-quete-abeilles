<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <RouterView v-slot="{ Component, route }">
        <Transition :name="route.meta.transition || ''" mode="out-in" v-if="!route.path.startsWith('/display')">
            <component :is="Component" :key="route.fullPath" />
        </Transition>
        <component v-else :is="Component" :key="route.fullPath" />
    </RouterView>
</template>

<style>
/* Page transitions */

.slide-in-enter-active {
    transition: opacity 0.4s ease 0.2s;
}

.slide-in-leave-active {
    transition: transform 0.2s cubic-bezier(.84, .27, .75, 1), opacity 0.2s ease;
}

.slide-in-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-in-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.slide-in-leave-from {
    transform: translateX(0);
    opacity: 1;
}

.slide-in-leave-to {
    transform: translateX(-80%);
    opacity: 0;
}
</style>
