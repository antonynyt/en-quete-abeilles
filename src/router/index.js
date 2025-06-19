import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'tasks',
            component: HomeView,
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
    ],
})

export default router
