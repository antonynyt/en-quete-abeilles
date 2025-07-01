/**
 * Task routes for finding a task by slug
 */

export default {
    routes: [
        {
            method: 'GET',
            path: '/tasks/slug/:slug',
            handler: 'api::task.task.findBySlug',
        },
    ],
};