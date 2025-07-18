<script setup>
import { ref } from 'vue';
import BaseModal from '../components/BaseModal.vue';
import TheHeader from '@/components/TheHeader.vue';
import { getWebSocketInstance } from '@/services/wsService';

const modal = ref(null);
const ws = getWebSocketInstance();

ws.onmessage = (event) => {
    console.log('Message from server:', event.data)
    modal.value.show();
};

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

</script>
<template>
    <div>
        <BaseModal ref="modal">
            <h2>Welcome to the Module List</h2>
            <p>Here you can explore various modules and their subjects.</p>
            <p>Click on a module to view its details and subjects.</p>
            <p>Enjoy your learning journey!</p>
        </BaseModal>
        <TheHeader :module="module" :subject="subject" />
        <slot />
    </div>
</template>