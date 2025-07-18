<script setup>
import DisplayLayout from '@/layouts/DisplayLayout.vue';
import { useRoute } from 'vue-router'
const route = useRoute()

</script>
<template>
    <DisplayLayout>
        <h1>hive {{ route.params.id }}</h1>
    </DisplayLayout>
</template>

<style scoped></style>