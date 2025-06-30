import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useBeeStore } from './beeStore'

export const useGameStore = defineStore(
    'game',
    () => {
        const timeStarted = ref(Date.now())
        const completedTasks = ref(new Set())
        const totalTasks = ref(0)
        const tasks = ref([])

        // Computed properties
        const tasksDone = computed(() => completedTasks.value.size)

        // Actions
        function setTasks(taskList) {
            tasks.value = taskList
            totalTasks.value = taskList.length
        }

        function markTaskAsCompleted(taskId) {
            completedTasks.value.add(taskId)

            // Update bee level when task is completed
            const beeStore = useBeeStore()
            beeStore.updateLevel(completedTasks.value.size)
        }

        function isTaskCompleted(taskId) {
            return completedTasks.value.has(taskId)
        }

        function getTaskById(taskId) {
            return tasks.value.find((task) => task.id === taskId)
        }

        const isAllTasksCompleted = computed(() => {
            return completedTasks.value.size === totalTasks.value
        })

        return {
            timeStarted,
            completedTasks,
            totalTasks,
            tasks,
            tasksDone,
            setTasks,
            markTaskAsCompleted,
            isTaskCompleted,
            getTaskById,
            isAllTasksCompleted,
        }
    },
    {
        persist: {
            serializer: {
                serialize: (state) => {
                    return JSON.stringify({
                        ...state,
                        completedTasks: Array.from(state.completedTasks),
                    })
                },
                deserialize: (value) => {
                    const parsed = JSON.parse(value)
                    return {
                        ...parsed,
                        completedTasks: new Set(parsed.completedTasks || []),
                    }
                },
            },
        },
    },
)
