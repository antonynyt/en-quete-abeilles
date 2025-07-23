<script setup>
import { useBroadcastChannel } from '@/composables/useBroadcastChannel';
import { watch, onMounted, onUnmounted, ref } from 'vue';
import pixiService from '@/services/pixiService';
import { useBeesStore } from '@/stores/beesStore';

const currentModule = ref(null);
const currentSubject = ref(null);

const beesStore = useBeesStore();

const { message } = useBroadcastChannel() // this line is necessary to assure routing from the /controller
const pixiContainer = ref(null);

watch(message, (newMessage) => {
    if (newMessage.data === 'toggle-nametags') {
        pixiService.toggleNametags();
    }
    else if (newMessage.data === 'hide-nametags') {
        pixiService.hideNametags();
    }
    else if (newMessage.type === 'add-bee') {
        const beeData = newMessage.data;
        pixiService.addBee(beeData);
    }
    else if (newMessage.type === 'message') {
        const data = newMessage.data;
        
        // Check if it's a module or subject based on structure
        if (data.subject && Array.isArray(data.subject)) {
            // It's a module
            currentModule.value = data;
            currentSubject.value = null; // Reset subject when new module
        } else if (data.video) {
            // It's a subject
            currentSubject.value = data;
        }
    }
});
onMounted(async () => {
    beesStore.initializeDefaultBees();
    if (pixiContainer.value) {
        await pixiService.initialize(pixiContainer.value);
        pixiService.setBees(beesStore.bees);
        pixiService.syncWithStore(beesStore.bees);
    }
});
</script>

<template>
    <div class="page">
        <div id="pixi-container" ref="pixiContainer" />
        <div class="overlay">
            <router-view 
                :module="currentModule" 
                :subject="currentSubject" 
            />
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