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
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
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
