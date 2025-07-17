<script setup>
import { onMounted, ref, watch } from 'vue';
import BaseButtonBack from '@/components/BaseButtonBack.vue';
import TheHeader from '@/components/TheHeader.vue';
import { useRouter, useRoute } from 'vue-router'
import { useStrapiApi } from '@/composables/useStrapiApi';
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs.vue';
import BaseCard from '@/components/BaseCard.vue';
import BaseCardList from '@/components/BaseCardList.vue';
import IconPlay from '@/components/icons/IconPlay.vue';

const router = useRouter()
const route = useRoute()
const { getModuleById } = useStrapiApi()

const module = ref(null)
const subject = ref({})

const fetchModule = async () => {
    try {
        const response = await getModuleById(route.params.moduleId)
        module.value = response.data

        if (route.params.subjectId) {
            subject.value = module.value.subject.find(s => s.id === parseInt(route.params.subjectId));
        }
    } catch (error) {
        console.error('Error fetching module:', error)
    }
};

const handleBack = () => {
    router.back()
}

onMounted(() => {
    fetchModule()
});

</script>

<template>
    <div class="page-container">
        <TheHeader>
            <template #left-side>
                <div class="left-side">
                    <BaseButtonBack class="backButton" @click="handleBack" />
                    <BaseBreadcrumbs v-if="module" :title="module.title" :subject-title="subject.title" />
                </div>
            </template>
        </TheHeader>

        <slot :module="module" :subject="subject"></slot>
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

.left-side {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.subject-list {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-lg);
}

.subject-list h2 {
    text-align: center;
    font-size: var(--font-size-sm);
    font-weight: 500;
}

.list {
    height: 100%;
    display: flex;
    align-items: center;
}

.list :deep(h2) {
    font-size: var(--font-size-md);
}

.list :deep(.card) {
    width: 25vw;
}
</style>