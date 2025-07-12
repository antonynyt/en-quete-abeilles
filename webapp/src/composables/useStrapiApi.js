import { ref, computed } from 'vue'

export function useStrapiApi() {
    const baseURL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

    const loading = ref(false)
    const error = ref(null)

    const apiRequest = async (endpoint, options = {}) => {
        loading.value = true
        error.value = null

        try {
            const url = `${baseURL}/api${endpoint}`
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    const getTasks = async () => {
        return await apiRequest('/tasks?populate=*&sort=order:asc')
    }

    const getTaskById = async (id) => {
        return await apiRequest(
            `/tasks/${id}?populate[objectives]=*&populate[details][populate]=*&populate[details][on][content.text][populate][paragraph][populate][0]=image&populate[details][on][content.media][populate]=*&populate[details][populate]=*&populate[goal][on][content.text][populate][paragraph][populate][0]=image&populate[goal][on][content.media][populate]=*&populate[details][on][content.embed][populate]=*`,
        )
    }

    const getTaskBySlug = async (slug) => {
        return await apiRequest(`/tasks/slug/${slug}?populate=*`)
    }

    const getTaskQuiz = async (id) => {
        return await apiRequest(`/tasks/${id}?populate[quiz][populate]=*`)
    }

    const getFinalTask = async () => {
        return await apiRequest(`/final-task?populate[clue][populate]=image`)
    }

    return {
        loading: computed(() => loading.value),
        error: computed(() => error.value),
        getTasks,
        getTaskById,
        apiRequest,
        getTaskBySlug,
        getTaskQuiz,
        getFinalTask,
    }
}
