import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/NotFound.vue'
import { useGameStore } from '@/stores/gameStore'

const onboardingGuard = (to, from, next) => {
    const excludedRoutes = ['task-detail']
    const isOnboardingComplete = localStorage.getItem('onboardingComplete') === 'true'

    if (to.name === 'onboarding' || isOnboardingComplete || excludedRoutes.includes(to.name)) {
        next()
    } else {
        next({ name: 'onboarding' })
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
        {
            path: '/',
            redirect: '/tasks',
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: () => import('../views/TasksView.vue'),
        },
        {
            path: '/tasks/:slug',
            name: 'task-clue',
            component: () => import('../views/ClueDetailView.vue'),
            meta: { transition: 'slide-in' },
        },
        {
            path: '/final-task',
            name: 'final-task',
            component: () => import('../views/FinalTaskView.vue'),
            beforeEnter: (to, from, next) => {
                if (useGameStore().isAllTasksCompleted) {
                    next()
                } else {
                    next({ name: 'tasks' })
                }
            },
        },
        {
            path: '/t/:id',
            name: 'task-detail',
            component: () => import('../views/TaskDetailView.vue'),
            meta: { transition: 'slide-in' },
        },
        {
            path: '/scanner',
            name: 'scanner',
            component: () => import('../views/ScannerView.vue'),
        },
        {
            path: '/profil',
            name: 'profil',
            component: () => import('../views/ProfilView.vue'),
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('../views/SettingsView.vue'),
        },
        {
            path: '/onboarding',
            name: 'onboarding',
            component: () => import('../views/Onboarding/Onboarding.vue'),
        },
    ],
})

router.beforeEach(onboardingGuard)

export default router
