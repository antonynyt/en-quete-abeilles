<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useStrapiApi } from '@/composables/useStrapiApi';
import ControllerLayout from './ControllerLayout.vue';
import { useBroadcastChannel } from '@/composables/useBroadcastChannel';

defineProps({
    blueToBottom: {
        type: String,
        default: "40%"
    }
})

const { sendMessage } = useBroadcastChannel('hive', false);

const route = useRoute()
const { getModuleById } = useStrapiApi()

const module = ref(null)
const subject = ref({})

const fetchModule = async () => {
    try {
        const response = await getModuleById(route.params.moduleId)
        module.value = response.data

        if (route.params.subjectId) {
            const subjectData = response.data.subject.find(s => s.id === parseInt(route.params.subjectId));
            subject.value = subjectData || {};
            sendMessage(subjectData);
        }else {
            sendMessage(response.data);
            sendMessage('hide-nametags');
        }
    } catch (error) {
        console.error('Error fetching module:', error)
    }
};

onMounted(() => {
    fetchModule()
});

</script>

<template>
    <ControllerLayout class="page-container" :module="module" :subject="subject">
        <slot :module="module" :subject="subject"></slot>
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
    bottom: v-bind(blueToBottom);
    width: 400%;
    height: 100%;
    background-color: var(--color-sky);
    border-radius: 50%;
    z-index: -1;
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