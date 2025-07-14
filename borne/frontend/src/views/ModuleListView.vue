<script setup>
import BaseButton from '../components/BaseButton.vue'
import { useStrapiApi } from '../composables/useStrapiApi';
import { ref, onMounted } from 'vue';

const { getModules } = useStrapiApi();
const modules = ref([]);
const fetchModules = async () => {
    try {
        const response = await getModules();
        modules.value = response.data;
        console.log('Modules fetched:', modules.value);
    } catch (error) {
        console.error('Error fetching modules:', error);
    }
};

onMounted(() => {
    fetchModules();
});
</script>

<template>
    <div>
        <h1>hello</h1>
        <div v-for="module in modules" :key="module.id">
            <p>{{ module.title }}</p>
            <BaseButton :to="`controller/module/${module.slug}`">Open</BaseButton>
        </div>
    </div>
</template>

<style scoped></style>