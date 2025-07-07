<script setup>
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'
import { useBeeStore } from '@/stores/beeStore'
import { useGameStore } from '@/stores/gameStore'

const bee = useBeeStore()
const game = useGameStore()

const qrData = ref(null)
qrData.value = {
    "id": Date.now(),
    "name": bee.name,
    "level": bee.level,
    "tasksCompleted": Array.from(game.completedTasks),
}

const qrDataString = btoa(JSON.stringify(qrData.value))
const value = ref('beecode:' + qrDataString)

</script>
<template>
    <qrcode-vue class="qr-code" :value="value" render-as="svg" foreground='var(--color-text)'
        background="var(--color-beige-light)" />
</template>

<style scoped>
.qr-code {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>