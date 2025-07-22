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
            path: '/controller/module/:moduleId',
            name: 'ControllerModule',
            component: () => import('../views/ModuleDetailView.vue'),
            meta: {
                broadcastTo: (route) => `/display/module/${route.params.moduleId}`,
            },
        },
        {
            path: '/controller/module/:moduleId/:subjectId',
            name: 'SubjectDetail',
            component: () => import('../views/SubjectDetailView.vue'),
            meta: {
                broadcastTo: (route) =>
                    `/display/module/${route.params.moduleId}/${route.params.subjectId}`,
            },
        },
        {
            path: '/display',
            name: 'Display',
            component: () => import('../layouts/DisplayLayout.vue'),
            children: [
                {
                    path: 'module/:id',
                    name: 'DisplayModule',
                    component: () => import('../views/HiveView.vue'),
                },
            ],
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
