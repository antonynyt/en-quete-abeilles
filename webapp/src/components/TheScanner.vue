<script setup>
import { ref, computed, defineEmits } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import IconFlag from './icons/IconFlag.vue'
import ObjectiveLi from './ObjectiveLi.vue'
import RoundCloseButton from './RoundCloseButton.vue'

const props = defineProps({
    showCloseBtn: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close'])

const modal = ref()
const showModal = () => modal.value?.show()

const isValid = ref(undefined)
const paused = ref(false)
const result = ref(null)

const task = {
    name: 'Apprendre à danser',
    description: "Découvrez comment l'abeille communique les directions.",
    color: '#33ddee',
    href: 'tasks',
    objectives: [
        'Regarder la vidéo',
        'Pratiquer la danse de l\'abeille',
        'Partager vos progrès avec vos amis'
    ]
}

const validationSuccess = computed(() => isValid.value === true)
const validationFailure = computed(() => isValid.value === false)

const onError = console.error

const resetValidationState = () => {
    isValid.value = false
    result.value = null
    paused.value = false
}

const handleCloseBtn = () => {
    emit('close')
}

const onDetect = async ([firstDetectedCode]) => {
    result.value = firstDetectedCode.rawValue
    isValid.value = result.value.startsWith('http://') || result.value.startsWith('https://')
    if (isValid.value) {
        if ('vibrate' in navigator) {
            navigator.vibrate(250)
        }
        showModal()
        paused.value = true
    }
}
</script>

<template>
    <div class="scanner-container">
        <BaseModal ref="modal" @close="resetValidationState" class="modal">
            <header class="modal-header">
                <BaseIcon :color="task.color">
                    <IconFlag />
                </BaseIcon>
                <div>
                    <h2>Tâche</h2>
                    <h3>{{ task.name }}</h3>
                </div>
            </header>
            <main>
                <section>
                    <h4>Objectifs</h4>
                    <ul>
                        <ObjectiveLi v-for="(objective, index) in task.objectives" :key="index">{{ objective }}
                        </ObjectiveLi>
                    </ul>
                </section>
            </main>
            <BaseButton tag="a" class="primary" :href="task.href">
                Accepter la tâche
            </BaseButton>
        </BaseModal>
        <qrcode-stream :paused="paused" @detect="onDetect" @error="onError" @camera-on="resetValidationState">
            <div v-if="showCloseBtn" class="close centered">
                <RoundCloseButton class="close-btn" @click="handleCloseBtn" />
            </div>
            <div class="hole" aria-hidden="true">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="qrcode-instructions">
                <p>Scanne le code d'une tâche</p>
            </div>
        </qrcode-stream>
    </div>
</template>

<style scoped>
.scanner-container {
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.scanner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hole {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -45%);
    width: 20rem;
    height: 20rem;
    max-height: 55vw;
    max-width: 55vw;
    box-shadow: 0 0 0 99999px rgba(0, 0, 0, .5);
}

.hole div {
    position: absolute;
    width: 30%;
    height: 30%;

    --shift: -0.15em;
    --border: 0.3em solid var(--color-background);
}

.hole div:nth-child(1) {
    top: var(--shift);
    left: var(--shift);
    border-left: var(--border);
    border-top: var(--border);
}

.hole div:nth-child(2) {
    top: var(--shift);
    right: var(--shift);
    border-top: var(--border);
    border-right: var(--border);
}

.hole div:nth-child(3) {
    bottom: var(--shift);
    left: var(--shift);
    border-bottom: var(--border);
    border-left: var(--border);
}

.hole div:nth-child(4) {
    bottom: var(--shift);
    right: var(--shift);
    border-right: var(--border);
    border-bottom: var(--border);
}

.close {
    position: relative;
}

.close-btn {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    z-index: 99;
}

.qrcode-instructions {
    position: absolute;
    width: 100%;
    height: 30%;
    color: var(--color-brown);
    font-family: "Pally", sans-serif;
    font-size: var(--font-size-lg);
    color: var(--color-background);

    display: flex;
    justify-content: center;
    align-items: center;
}

.qrcode-instructions p {
    z-index: 1;
    text-shadow: 0 0px 10px rgba(0, 0, 0, 0.5);
}

.modal-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.modal main {
    padding: var(--spacing-sm) 0;
}

h3 {
    font-size: var(--font-size-md);
    font-weight: 500;
}

h4 {
    margin-bottom: var(--font-size-xs);
}
</style>