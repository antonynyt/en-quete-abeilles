import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useBeeStore } from './beeStore'

export const useGameStore = defineStore(
    'game',
    () => {
        const timeStarted = ref(Date.now())
        const completedTasks = ref(new Set())
        const scannedTasks = ref(new Set())
        const totalTasks = ref(0)
        const tasks = ref([])
        const timeEnded = ref(null)

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

            if (completedTasks.value.size === totalTasks.value) {
                timeEnded.value = Date.now()
            }
        }

        function isTaskCompleted(taskId) {
            return completedTasks.value.has(taskId)
        }

        function markTaskAsScanned(taskId) {
            scannedTasks.value.add(taskId)
        }

        function isTaskScanned(taskId) {
            return scannedTasks.value.has(taskId)
        }

        function getTaskById(taskId) {
            return tasks.value.find((task) => task.id === taskId)
        }

        const isAllTasksCompleted = computed(() => {
            return completedTasks.value.size === totalTasks.value
        })

        const timeDuration = computed(() => {
            if (timeEnded.value) {
                return timeEnded.value - timeStarted.value
            }
            return Date.now() - timeStarted.value
        })

        return {
            timeStarted,
            timeEnded,
            timeDuration,
            completedTasks,
            scannedTasks,
            totalTasks,
            tasks,
            tasksDone,
            setTasks,
            markTaskAsCompleted,
            isTaskCompleted,
            markTaskAsScanned,
            isTaskScanned,
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
                        scannedTasks: Array.from(state.scannedTasks),
                    })
                },
                deserialize: (value) => {
                    const parsed = JSON.parse(value)
                    return {
                        ...parsed,
                        completedTasks: new Set(parsed.completedTasks || []),
                        scannedTasks: new Set(parsed.scannedTasks || []),
                    }
                },
            },
        },
    },
)
