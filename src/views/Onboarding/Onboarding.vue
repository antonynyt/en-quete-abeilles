<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Step1 from './Step1.vue'
import BaseProgress from '@/components/BaseProgress.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtonBack from '@/components/BaseButtonBack.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'

const router = useRouter()
const currentStep = ref(1)
const totalSteps = 5

// Track user progress (optional - prevents skipping ahead)
const maxAllowedStep = ref(1)

const stepComponents = {
    1: {
        component: Step1,
        buttonText: "Commencer l'aventure",
        primary: true
    },
    2: {
        component: Step2,
        buttonText: "Observer la ruche"
    },
    3: {
        component: Step3,
        buttonText: "Adopter l'abeille"
    },
}

const currentComponent = computed(() => stepComponents[currentStep.value]?.component)
const buttonText = computed(() => stepComponents[currentStep.value]?.buttonText || 'Continuer')

// Navigation controls
function goNext() {
    if (currentStep.value < totalSteps) {
        currentStep.value++
        maxAllowedStep.value = Math.max(maxAllowedStep.value, currentStep.value)
    } else {
        completeOnboarding()
    }
}

function goBack() {
    if (currentStep.value > 1) {
        currentStep.value--
    }
}

function completeOnboarding() {
    localStorage.setItem('onboardingComplete', 'true')
    router.push('/')
}
</script>

<template>
    <div class="onboarding container-spacing">
        <!-- Progress indicator -->
        <BaseProgress :current-step="currentStep - 1" :total-steps="totalSteps - 1" />

        <!-- Step content with transition -->
        <div class="content-wrapper">
            <div class="content-step">
                <component :is="currentComponent" :key="currentStep" />
            </div>
        </div>

        <!-- Navigation buttons -->
        <div class="actions">
            <BaseButtonBack v-if="currentStep != 1" @click="goBack" />
            <BaseButton @click="goNext" :class="(stepComponents[currentStep]?.primary ? 'primary' : '')">
                {{ buttonText }}
            </BaseButton>
        </div>
    </div>
</template>

<style scoped>
.onboarding {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: min-content 1fr min-content;
    height: 100dvh;
    gap: var(--spacing-md);
}

.content-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 0;
    width: 100%;
    overflow: visible;
}

.content-step {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    padding-bottom: var(--spacing-md);
}

.actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: var(--spacing-md);
    margin-bottom: 0;
}

@media only screen and (min-device-height: 460px) and (min-height: 360px) {
    .actions {
        margin-bottom: var(--spacing-md);
    }
}
</style>