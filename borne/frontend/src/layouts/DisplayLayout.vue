<script setup>
import { useBroadcastChannel } from '@/composables/useBroadcastChannel';
useBroadcastChannel() // this line is necessary to assure routing from the /controller

</script>

<template>
    <div>
        <slot />
    </div>
</template>