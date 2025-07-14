<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <div>
        <h1>Module {{ route.params.id }}</h1>
    </div>
</template>

<style scoped></style>