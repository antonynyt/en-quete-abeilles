import { ref, computed } from 'vue'
import { useStrapiApi } from '@/composables/useStrapiApi'
import { lightenHexColor } from '@/utils/color'

export function useTask() {
    const { getTaskById } = useStrapiApi()
    const task = ref(null)
    const isLoading = ref(false)
    const error = ref(null)

    const bgColor = computed(() => {
        if (!task.value) return '#ffffff'
        return lightenHexColor(task.value.color, 0.6)
    })

    const mapTaskResponse = (response) => ({
        id: response.data.documentId,
        title: response.data.title,
        description: response.data.shortDescr,
        color: response.data.color,
        objectives: response.data.objectives || [],
        details: response.data.details || [],
        goal: response.data.goal || [],
    })

    const loadTask = async (taskId) => {
        isLoading.value = true
        error.value = null

        try {
            const response = await getTaskById(taskId)
            task.value = mapTaskResponse(response)

            if (!task.value) {
                throw new Error('Task not found')
            }
        } catch (err) {
            console.error('Failed to load task:', err)
            error.value = err
        } finally {
            isLoading.value = false
        }
    }

    return {
        task,
        isLoading,
        error,
        bgColor,
        loadTask,
    }
}
