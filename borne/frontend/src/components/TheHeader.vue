<script setup>
import router from '@/router';
import BaseButton from './BaseButton.vue';
import TheProfilePicture from './TheProfilePicture.vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Page Title',
    },
});

const handleReset = () => {
    localStorage.clear();
    window.location.replace('/');
};

</script>

<template>
    <header class="full-width">
        <div class="page-header">

            <slot name="left-side" class="left-side">
                <div class="left-side">
                    <TheProfilePicture class="offline" />
                    <span class="pally">Non connecté</span>
                </div>
            </slot>

            <div class="right-side">
                <BaseButton @click="router.push('/')">Home</BaseButton>
                <BaseButton class="danger" @click="handleReset">Reset</BaseButton>
            </div>
        </div>
    </header>
</template>

<style scoped>
.page-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: var(--spacing-md) auto;
    padding: 0 var(--spacing-md);
}

.left-side {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.right-side {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

span {
    font-size: var(--font-size-md);
}
</style>