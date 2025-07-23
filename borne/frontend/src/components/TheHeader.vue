<script setup>
import { computed } from 'vue';
import router from '@/router';
import BaseButton from './BaseButton.vue';
import TheProfilePicture from './TheProfilePicture.vue';
import BaseButtonBack from './BaseButtonBack.vue';
import BaseBreadcrumbs from './BaseBreadcrumbs.vue';
import { useBroadcastChannel } from '@/composables/useBroadcastChannel';

const { sendMessage } = useBroadcastChannel('hive', false);

const props = defineProps({
    module: {
        type: Object,
        default: null,
    },
    subject: {
        type: Object,
        default: null,
    },
    showNav: {
        type: Boolean,
        default: false,
    }
});

const handleReset = () => {
    localStorage.clear();
    window.location.replace('/');
};

const handleBack = () => {
    router.back()
}
</script>

<template>
    <header class="full-width">
        <div class="page-header">

            <div v-if="showNav" class="left-side">
                <BaseButtonBack class="backButton" @click="handleBack" />
                <BaseBreadcrumbs v-if="module" :title="module.title" :subject-title="subject.title" />
            </div>

            <div v-else class="left-side">
                <TheProfilePicture class="profilePicture offline" />
                <span class="pally">Mode invité</span>
            </div>

            <div class="right-side">
                <!-- <BaseButton class="button" @click="sendMessage('toggle-nametags')">Noms</BaseButton> -->
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
    align-items: stretch;
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
    flex-shrink: 0;
}
</style>