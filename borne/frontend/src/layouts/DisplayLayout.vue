<script setup>
import { useBroadcastChannel } from '@/composables/useBroadcastChannel';
import { watch } from 'vue';
const { message } = useBroadcastChannel() // this line is necessary to assure routing from the /controller

watch(message, (newMessage) => {
    if (newMessage) {
        console.log('Received message from broadcast channel:', newMessage);
        // Handle the received message as needed
    }
});

</script>

<template>
    <div>
        <slot />
    </div>
</template>