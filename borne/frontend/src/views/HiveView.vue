<script setup>
import { useBroadcastChannel } from '@/composables/useBroadcastChannel';
import { useRoute } from 'vue-router'
const route = useRoute()

useBroadcastChannel() // this line is necessary to assure routing from the /controller
</script>
<template>
    <div>
        <h1>hive {{ route.params.id }}</h1>
    </div>
</template>

<style scoped></style>