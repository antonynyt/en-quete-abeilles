import { createRouter, createWebHistory } from 'vue-router'
import { useBroadcastChannel } from '../composables/useBroadcastChannel'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/controller',
        },
        {
            path: '/controller',
            name: 'Controller',
            component: () => import('../views/ModuleListView.vue'),
            meta: {
                broadcastTo: '/display',
            },
        },
        {
            path: '/controller/module/:id',
            name: 'ControllerModule',
            component: () => import('../views/ModuleView.vue'),
            meta: {
                broadcastTo: (route) => `/display/module/${route.params.id}`,
            },
        },
        {
            path: '/display',
            name: 'Display',
            component: () => import('../views/HiveView.vue'),
        },
        {
            path: '/display/module/:id',
            name: 'DisplayModule',
            component: () => import('../views/HiveView.vue'),
        },
    ],
})

// allow to broadcast navigation changes to the display
router.beforeEach((to, from, next) => {
    if (to.meta.broadcastTo) {
        const { sendNavigation } = useBroadcastChannel('hive', false)

        const target =
            typeof to.meta.broadcastTo === 'function'
                ? to.meta.broadcastTo(to)
                : to.meta.broadcastTo

        sendNavigation(target)
    }
    next()
})

export default router
