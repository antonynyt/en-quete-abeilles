import { createRouter, createWebHistory } from 'vue-router'

const onboardingGuard = (to, from, next) => {
    const isOnboardingComplete = localStorage.getItem('onboardingComplete') === 'true'
    if (to.name === 'onboarding' || isOnboardingComplete) {
        next()
    } else {
        next({ name: 'onboarding' })
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'tasks',
            component: () => import('../views/HomeView.vue'),
            beforeEnter: onboardingGuard,
        },
        {
            path: '/scanner',
            name: 'scanner',
            component: () => import('../views/ScannerView.vue'),
            beforeEnter: onboardingGuard,
        },
        {
            path: '/profil',
            name: 'profil',
            component: () => import('../views/ProfilView.vue'),
            beforeEnter: onboardingGuard,
        },
        {
            path: '/clue',
            name: 'clue',
            component: () => import('../views/ClueView.vue'),
            meta: { transition: 'slide-in' },
            beforeEnter: onboardingGuard,
        },
        {
            path: '/onboarding',
            name: 'onboarding',
            component: () => import('../views/Onboarding/Onboarding.vue'),
        },
    ],
})

export default router
