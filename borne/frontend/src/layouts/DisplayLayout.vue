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

            <div class="banner-info" v-if="!currentModule && !currentSubject">
                <div class="banner-info-content">
                    <h1>Ajoute ton abeille !</h1>
                    <p>Participe au jeu de piste et découvre l'abeille</p>
                </div>
                <div class="banner-info-cover">
                    <img src="@/assets/app-qrcode.svg" alt="https://app.cca-abeille.ch" />
                </div>
            </div>

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

.banner-info {
    background-color: var(--color-background);
    display: grid;
    grid-template-columns: auto auto;

    position: absolute;
    bottom: var(--spacing-md);
    left: var(--spacing-md);
    height: auto;

    border: var(--border-size) solid var(--color-brown);
    border-radius: var(--radius-sm);
    overflow: hidden;
}

.banner-info-content {
    padding: var(--spacing-md);
}

.banner-info-content h1 {
    margin-bottom: var(--spacing-xs);
}

.banner-info-content p {
    margin: 0;
}

.banner-info-cover {
    height: 100%;
    width: auto;
    display: flex;
    padding: var(--spacing-sm);
}
</style>