<script setup>
import { useStrapiApi } from '../composables/useStrapiApi';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import BaseCardList from '@/components/BaseCardList.vue';
import BaseCard from '@/components/BaseCard.vue';
import ControllerLayout from '@/layouts/ControllerLayout.vue';

const { getModules } = useStrapiApi();
const modules = ref([]);
const cardListRef = ref(null);

const fetchModules = async () => {
    try {
        const response = await getModules();
        modules.value = response.data;
    } catch (error) {
        console.error('Error fetching modules:', error);
    }
};

const saveScrollPosition = () => {
    if (cardListRef.value) {
        const scrollContainer = cardListRef.value.$el || cardListRef.value;
        sessionStorage.setItem('moduleListScroll', scrollContainer.scrollLeft);
    }
};

const restoreScrollPosition = () => {
    const savedPosition = sessionStorage.getItem('moduleListScroll');
    if (savedPosition && cardListRef.value) {
        const scrollContainer = cardListRef.value.$el || cardListRef.value;
        scrollContainer.scrollLeft = parseInt(savedPosition);
    }
};

onMounted(async () => {
    await fetchModules();
    // Restore scroll position after data is loaded
    restoreScrollPosition();
});

onBeforeUnmount(() => {
    saveScrollPosition();
});
</script>

<template>
    <ControllerLayout class="page-container">
        <div class="module-list">
            <BaseCardList ref="cardListRef">
                <BaseCard v-for="module in modules" :key="module.id" :item="module"
                    :to="`controller/module/${module.documentId}`" />
            </BaseCardList>
        </div>
    </ControllerLayout>
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