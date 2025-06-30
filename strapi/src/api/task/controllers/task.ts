/**
 * task controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::task.task', ({ strapi }) => ({
    async findOne(ctx) {
        const { slug } = ctx.params;

        // Find the task by slug
        const entity = await strapi.db.query('api::task.task').findOne({
            where: { slug },
            populate: {
                clue: {
                    populate: ['image'],
                },
            }
        }); 
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);
    },
}));