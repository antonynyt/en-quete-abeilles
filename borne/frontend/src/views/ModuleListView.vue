<script setup>
import TheHeader from '@/components/TheHeader.vue';
import { useStrapiApi } from '../composables/useStrapiApi';
import { ref, onMounted } from 'vue';
import BaseCardList from '@/components/BaseCardList.vue';
import BaseCard from '@/components/BaseCard.vue';

const { getModules } = useStrapiApi();
const modules = ref([]);
const fetchModules = async () => {
    try {
        const response = await getModules();
        modules.value = response.data;
    } catch (error) {
        console.error('Error fetching modules:', error);
    }
};

onMounted(() => {
    fetchModules();
});
</script>

<template>
    <div class="page-container">
        <TheHeader />
        <div class="module-list">
            <BaseCardList>
                <BaseCard v-for="module in modules" :key="module.id" :item="module"
                    :to="`controller/module/${module.documentId}`" />
            </BaseCardList>
        </div>
    </div>
</template>

<style scoped>
.page-container {
    position: relative;
    overflow: hidden;
}

.page-container::before {
    content: "";
    position: absolute;
    align-self: center;
    bottom: 40%;
    width: 400%;
    height: 100%;
    background-color: var(--color-sky);
    border-radius: 50%;
    z-index: -1;
}

.module-list {
    height: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
}
</style>