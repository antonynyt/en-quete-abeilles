<script setup>
import { useBroadcastChannel } from '@/composables/useBroadcastChannel';
import { watch, onMounted, onUnmounted, ref } from 'vue';
import pixiService from '@/services/pixiService';
import { useBeesStore } from '@/stores/beesStore';
import { useUserStore } from '@/stores/userStore';
import { useRoute } from 'vue-router';

const currentModule = ref(null);
const currentSubject = ref(null);

const beesStore = useBeesStore();

const route = useRoute();

const { message } = useBroadcastChannel()
const pixiContainer = ref(null);

watch(message, (newMessage) => {
    switch (newMessage.type) {
        case 'add-bee':
            pixiService.addBee(newMessage.data);
            break;
        case 'highlight-bee':
            pixiService.showBeeNametag(newMessage.data);
            break;
        case 'message':
            const data = newMessage.data;
            if (data.subject && Array.isArray(data.subject)) {
                currentModule.value = data;
                currentSubject.value = null;
            } else if (data.video) {
                currentSubject.value = data;
            }
            break;
    }
    switch (newMessage.data) {
        case 'toggle-nametags':
            pixiService.toggleNametags();
            break;
        case 'hide-nametags':
            pixiService.hideNametags();
            break;
    }
});

const handleStorageChange = (event) => {
    if (event.key === 'user') {
        const userData = JSON.parse(event.newValue);
        pixiService.showBeeNametag(userData?.currentBee.id);
    }
};

onMounted(async () => {
    beesStore.initializeDefaultBees();
    if (pixiContainer.value) {
        await pixiService.initialize(pixiContainer.value);
        pixiService.setBees(beesStore.bees);
    }
    window.addEventListener('storage', handleStorageChange);

    // Stop animation based on route
    if (route.params.subjectId) {
        pixiService.stopAnimation()
    } else {
        pixiService.startAnimation()
    }
});

</script>

<template>
    <div class="page">
        <div id="pixi-container" ref="pixiContainer" />
        <div class="overlay">
            <router-view :module="currentModule" :subject="currentSubject" />
        </div>
    </div>
</template>

<style scoped>
.pixi-container {
    background-color: #ffcd68;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

#pixi-container :deep(canvas) {
    display: block;
}
</style>