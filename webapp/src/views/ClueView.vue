<script setup>
import BaseIcon from '@/components/BaseIcon.vue';
import IconBack from '@/components/icons/IconBack.vue';
import BaseIconLink from '@/components/BaseIconLink.vue';
import IconFlag from '@/components/icons/IconFlag.vue';
import StrapiImage from '@/components/StrapiImage.vue';
import { useStrapiApi } from '@/composables/useStrapiApi'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { getTaskBySlug } = useStrapiApi()
const task = ref(null)

const loadTask = async () => {
    try {
        const response = await getTaskBySlug(route.params.slug)
        // remap the response to match the expected structure
        task.value = {
            id: response.data.id,
            title: response.data.title,
            description: response.data.clue.description,
            fact: response.data.clue.fact,
            image: response.data.clue.image,
            color: response.data.color || '#1111',
        }
        if (!task.value) {
            throw new Error('Task not found')
            router.push({ name: 'NotFound' })
        }
    } catch (err) {
        console.error('Failed to load task:', err)
        router.push({ name: 'NotFound' })
    }
}

const goBack = () => {
    router.push({ name: 'tasks' })
}

onMounted(() => {
    loadTask()
})

</script>

<template>
    <div v-if="task" class="page-container">
        <header class="page-header centered">
            <div class="page-header-title">
                <BaseIconLink link="/tasks" @click.prevent="goBack" :icon="IconBack" label="Retour" />
                <p class="page-title">Indice</p>
            </div>
            <BaseIcon class="page-icon" :color="task.color">
                <IconFlag />
            </BaseIcon>
        </header>
        <main class="centered">
            <h1>{{ task.title }}</h1>
            <h2>Indice</h2>
            <p>{{ task.description }}</p>
            <h2>Le savais-tu?</h2>
            <p>{{ task.fact }}</p>
            <StrapiImage :imageData="task.image" :alt="task.title" format="medium" imageClass="clue-image"
                @load="console.log('Image loaded')" @error="console.log('Image failed to load')" />
        </main>
    </div>
</template>

<style scoped>
.page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 2rem;
}

.page-header-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.clue-image {
    width: 100%;
    height: auto;
    aspect-ratio: 4/3;
    border-radius: 8px;
    border: 2px solid var(--color-brown);
    object-fit: cover;
}
</style>
