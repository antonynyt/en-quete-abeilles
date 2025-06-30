/**
 * Task routes for finding a task by slug
 */

export default {
    routes: [
        {
            method: 'GET',
            path: '/tasks/:slug',
            handler: 'api::task.task.findOne',
            config: {
                auth: false,
                policies: [],
            },
        },
    ],
};