<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import BaseModal from '../components/BaseModal.vue';
import TheHeader from '@/components/TheHeader.vue';
import { getWebSocketInstance } from '@/services/wsService';
import TheBee from '@/components/TheBee.vue';
import ObjectiveLi from '@/components/ObjectiveLi.vue';
import { useStrapiApi } from '@/composables/useStrapiApi';
import BaseButton from '@/components/BaseButton.vue';
import { useBroadcastChannel } from '@/composables/useBroadcastChannel';
import BaseToast from '@/components/BaseToast.vue';
import { useBeesStore } from '@/stores/beesStore';
import { useUserStore } from '@/stores/userStore';
import { formatTimeFromTimestamp } from '@/utils/formatTime';

defineProps({
    module: {
        type: Object,
        required: false
    },
    subject: {
        type: Object,
        required: false
    }
});

// Refs
const modal = ref(null);
const toast = ref(null);
const currentBee = ref(null);
const toastMessage = ref('Code invalide ou non reconnu.');

// Stores and services
const beesStore = useBeesStore();
const userStore = useUserStore();
const { getTaskById } = useStrapiApi();
const { sendBee, highlightBee } = useBroadcastChannel('hive', false);
const ws = getWebSocketInstance();

// Computed
const isUserConnected = computed(() => !!userStore.currentBee);
const alreadyScanned = computed(() => currentBee.value && beesStore.beeExists(currentBee.value.id));
const timeSpentFormatted = computed(() => {
    return currentBee.value ? formatTimeFromTimestamp(currentBee.value.time) : '';
});

// Methods
const showToast = (message = 'Code invalide ou non reconnu.') => {
    toastMessage.value = message;
    toast.value?.show();
};

const showModal = () => {
    modal.value?.show();
};

const closeModal = () => {
    modal.value?.close();
};

const loadUserBee = () => {
    currentBee.value = userStore.currentBee;
};

const processBeeCode = async (code) => {
    try {
        const decodedData = atob(code);
        const parsedBee = JSON.parse(decodedData);

        if (!validateBeeObject(parsedBee)) {
            throw new Error('Invalid bee object structure');
        }

        currentBee.value = parsedBee;
        await fetchTasksForBee();
        showModal();
    } catch (error) {
        console.error('Error processing bee data:', error);
        showToast();
    }
};

const fetchTasksForBee = async () => {
    if (!currentBee.value?.tasksCompleted) return;

    try {
        const tasksPromises = currentBee.value.tasksCompleted.map(async (taskId) => {
            const task = await getTaskById(taskId);
            return task.data.title;
        });
        currentBee.value.tasksCompleted = await Promise.all(tasksPromises);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

const validateBeeObject = (obj) => {
    return obj
        && typeof obj === 'object'
        && typeof obj.name === 'string'
        && typeof obj.level === 'string'
        && Array.isArray(obj.tasksCompleted);
};

const handleBeeSend = () => {
    if (!currentBee.value) return;

    const scannedBee = beesStore.addScannedBee(currentBee.value);

    if (!scannedBee) {
        showToast('Cette abeille a déjà été scannée.');
        return;
    }

    userStore.setCurrentBee(currentBee.value);
    highlightBee(scannedBee.id);
    sendBee(JSON.stringify(scannedBee));
    closeModal();
};

const handleBeeShow = () => {
    if (!currentBee.value) return;

    userStore.setCurrentBee(currentBee.value);
    highlightBee(currentBee.value.id);
    closeModal();
};

const handleProfileClick = () => {
    if (isUserConnected.value) {
        loadUserBee();
    } else {
        currentBee.value = null;
    }
    showModal();
};

// Manual bee websocket handling
window.sendBeeCodeDebug = async (code) => {
    try {
        // Directly use the code argument
        await processBeeCode(code);
    } catch (error) {
        console.error('Error processing bee code:', error);
        showToast();
    }
};

// WebSocket handling
ws.onmessage = async (event) => {
    try {
        const data = JSON.parse(event.data);

        if (data?.type === 'beecode' && typeof data.code === 'string') {
            await processBeeCode(data.code);
        } else {
            showToast();
        }
    } catch (error) {
        console.error('Error parsing WebSocket message:', error);
        showToast();
    }
};

// Watch for user connection changes
watch(isUserConnected, (connected) => {
    if (!connected) {
        currentBee.value = null;
    }
});

onMounted(() => {
    // rehydrate bees store from localStorage
    window.addEventListener('storage', (event) => {
        if (event.key === 'bees') {
            beesStore.$hydrate({ runHooks: false });
        }
    });
});
</script>

<template>
    <div>
        <BaseModal ref="modal">
            <!-- Bee Modal when user is connected and has a bee -->
            <div class="bee-modal" v-if="currentBee">
                <div class="bee-modal__info-section">
                    <TheBee class="bee-modal__image" />
                    <div class="bee-modal__details">
                        <h2>{{ currentBee.name }}</h2>
                        <p class="pally">{{ currentBee.level }}</p>
                    </div>
                </div>
                <div class="bee-modal__content">
                    <h2 class="pally">Quête terminée !</h2>
                    <p>Tu as ramené l'abeille en<br><span class="bold">{{ timeSpentFormatted }}</span></p>
                    <div>
                        <p class="pally">Tu sais maintenant</p>
                        <ul>
                            <ObjectiveLi v-for="(task, index) in currentBee.tasksCompleted" :key="index">
                                {{ task }}
                            </ObjectiveLi>
                        </ul>
                    </div>
                    <BaseButton class="primary bee-modal__send-button" v-if="!alreadyScanned" @click="handleBeeSend">
                        Relâcher {{ currentBee.name }}
                    </BaseButton>
                    <BaseButton class="primary bee-modal__send-button" v-else @click="handleBeeShow">
                        Afficher {{ currentBee.name }}
                    </BaseButton>
                </div>
            </div>

            <!-- Default Modal when user is not connected -->
            <div class="default-modal" v-else>
                <div class="default-modal__content">
                    <h2 class="pally">Tu n'es pas connecté...</h2>
                    <p>Participe au jeu de piste ou fais scanner sur cette borne ton code abeille à la fin de toutes les
                        activités.</p>
                </div>
                <div class="default-modal__image">
                    <img src="@/assets/app-qrcode.svg" alt="https://app.cca-abeille.ch">
                    <p class="default-modal__image-label">Scanne pour accéder au jeu.</p>
                </div>
            </div>
        </BaseModal>

        <BaseToast ref="toast" :duration="5000" type="danger" :message="toastMessage" :autoShow="false" />
        <TheHeader :module="module" :subject="subject" @profile-click="handleProfileClick" />

        <slot />
    </div>
</template>

<style scoped>
.bee-modal {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
}

.bee-modal__info-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: var(--spacing-lg) var(--spacing-xl);
    background-color: var(--color-beige);
    border-radius: var(--radius-sm);
    gap: var(--spacing-lg);
}

.bee-modal__details {
    text-align: center;
}

.bee-modal__details h2 {
    font-size: var(--font-size-xl);
}

.bee-modal__details p {
    font-size: var(--font-size-sm);
    font-weight: 400;
}

.bee-modal__image {
    width: 15vw;
    height: auto;
    min-width: 150px;
}

.bee-modal__content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.bee-modal__content span.bold {
    font-size: var(--font-size-md);
    margin: 0;
}

.bee-modal__send-button {
    margin-top: auto;
}

.default-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--spacing-lg) var(--spacing-xxl);
    text-align: center;
}

.default-modal h2 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-md);
}

.default-modal p {
    max-width: 650px;
}

.default-modal img {
    width: 100%;
    max-width: 200px;
    margin-top: var(--spacing-md);
}

.default-modal__image-label {
    font-size: var(--font-size-xs);
    margin-top: var(--spacing-xs);
    color: var(--color-brown);
}
</style>