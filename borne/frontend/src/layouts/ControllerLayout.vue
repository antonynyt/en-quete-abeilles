<script setup>
import { ref, onMounted } from 'vue';
import BaseModal from '../components/BaseModal.vue';
import TheHeader from '@/components/TheHeader.vue';
import { getWebSocketInstance } from '@/services/wsService';
import TheBee from '@/components/TheBee.vue';
import ObjectiveLi from '@/components/ObjectiveLi.vue';
import { useStrapiApi } from '@/composables/useStrapiApi';
import BaseButton from '@/components/BaseButton.vue';
import { useBroadcastChannel } from '@/composables/useBroadcastChannel';
import BaseToast from '@/components/BaseToast.vue';

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

const modal = ref(null);
const toast = ref(null);
const toastMessage = ref('Code invalide ou non reconnu.');
const ws = getWebSocketInstance();
const bee = ref(null);

const { getTaskById } = useStrapiApi();
const { sendMessage } = useBroadcastChannel('hive', false);

// fetch and replace by title in the bee ref
const fetchTasks = async () => {
    if (bee.value && bee.value.tasksCompleted) {
        const tasksPromises = bee.value.tasksCompleted.map(async (taskId) => {
            const task = await getTaskById(taskId);
            return task.data.title;
        });
        bee.value.tasksCompleted = await Promise.all(tasksPromises);
    }
};

ws.onmessage = async (event) => {
    try {
        const data = JSON.parse(event.data);
        if (data && typeof data === 'object' && data.type === 'beecode' && typeof data.code === 'string') {
            try {
                const decodedData = atob(data.code);
                const parsedBee = JSON.parse(decodedData);

                if (validateBeeObject(parsedBee)) {
                    bee.value = parsedBee;
                    await fetchTasks();
                    modal.value.show();
                } else {
                    console.error('Invalid bee object structure');
                }
            } catch (innerError) {
                console.error('Error processing bee data:', innerError);
            }
        } else {
            //TODO: show a toast or notification for invalid message format
            toast.value?.show();
            console.error('Invalid message format:', data);
        }
    } catch (error) {
        console.error('Error parsing WebSocket message:', error);
    }
};

function validateBeeObject(obj) {
    return obj
        && typeof obj === 'object'
        && typeof obj.name === 'string'
        && typeof obj.level === 'string'
        && Array.isArray(obj.tasksCompleted)
}

const handleBeeSend = () => {
    //TODO: verify taht bee is not already sent
    if (bee.value) {
        console.log('Sending bee data:', bee.value);
        sendMessage(JSON.stringify(bee.value));
        modal.value.close();
    }
};

</script>

<template>
    <div>
        <BaseModal ref="modal" :showCloseButton="false">
            <div class="bee-modal" v-if="bee">
                <div class="bee-modal__info-section">
                    <TheBee class="bee-modal__image" />
                    <div class="bee-modal__details">
                        <h2>{{ bee.name }}</h2>
                        <p class="pally">Niveau: {{ bee.level }}</p>
                    </div>
                </div>
                <div class="bee-modal__content">
                    <h2 class="pally">Quête terminée !</h2>
                    <div>
                        <p class="pally">Tu sais maintenant</p>
                        <ul>
                            <ObjectiveLi v-for="(task, index) in bee.tasksCompleted" :key="index">{{ task }}
                            </ObjectiveLi>
                        </ul>
                    </div>
                    <BaseButton class="primary bee-modal__send-button" @click="handleBeeSend()">Relâcher {{ bee.name }}
                    </BaseButton>
                </div>
            </div>
        </BaseModal>
        <BaseToast ref="toast" :duration="5000" type="danger" :message="toastMessage" :autoShow="false">
            {{ toastMessage }}
        </BaseToast>
        <TheHeader :module="module" :subject="subject" />
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

.bee-modal__send-button {
    margin-top: auto;
}
</style>