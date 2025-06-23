<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Step1 from './Step1.vue'
import BaseProgress from '@/components/BaseProgress.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtonBack from '@/components/BaseButtonBack.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'
import Step4 from './Step4.vue'
import Step5 from './Step5.vue'

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
    4: {
        component: Step4,
        buttonText: "Continuer"
    },
    5: {
        component: Step5,
        buttonText: "C'est compris!",
        primary: true
    }
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
    <main class="onboarding">
        <header>
            <BaseProgress :current-step="currentStep - 1" :total-steps="totalSteps - 1" />
        </header>

        <section class="content-wrapper">
            <div class="content">
                <component :is="currentComponent" :key="currentStep" />
            </div>
        </section>

        <nav class="actions">
            <BaseButtonBack v-if="currentStep != 1" @click="goBack" />
            <BaseButton @click="goNext" :class="(stepComponents[currentStep]?.primary ? 'primary' : '')">
                {{ buttonText }}
            </BaseButton>
        </nav>
    </main>
</template>

<style scoped>
header,
.actions,
.description {
    padding: var(--spacing-md);
    max-width: 732px;
    margin: 0 auto;
    width: 100%;
}

header,
.description {
    padding-bottom: 0;
}

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

.content {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
    overflow: hidden;
    overflow-y: auto;
}

.actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: var(--spacing-md);
    margin-bottom: 0;
}

@media only screen and (min-device-height: 460px) and (min-height: 460px) {
    .actions {
        margin-bottom: var(--spacing-md);
    }
}
</style>