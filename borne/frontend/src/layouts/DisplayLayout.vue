<script setup>
import { useBroadcastChannel } from '@/composables/useBroadcastChannel';
import { watch, onMounted, onUnmounted, ref } from 'vue';
import pixiService from '@/services/pixiService';
import { generateBeeName } from '@/utils/nameGenerator';

const bees = ref([])

for (let i = 0; i < 1; i++) {
    bees.value.push({
        id: i,
        name: generateBeeName()
    });
}

const { message } = useBroadcastChannel() // this line is necessary to assure routing from the /controller
const pixiContainer = ref(null);

watch(message, (newMessage) => {
    if (newMessage.data === 'toggle-nametags') {
        pixiService.toggleNametags();
    }
});

onMounted(async () => {
    if (pixiContainer.value) {
        await pixiService.initialize(pixiContainer.value);
        pixiService.setBees(bees.value);
    }
});

onUnmounted(() => {
    pixiService.cleanup();
});
</script>

<template>
    <div>
        <div id="pixi-container" ref="pixiContainer" />
        <div class="overlay">
            <router-view />
        </div>
    </div>
</template>

<style scoped>
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