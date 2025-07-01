/**
 * task controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::task.task", ({ strapi }) => ({
    async findBySlug(ctx) {
        const { slug } = ctx.params;
        const entity = await strapi.documents("api::task.task").findFirst({
            filters: { slug: slug },
            populate: { clue: { populate: { image: true } } },
        });
        if (!entity) return ctx.notFound("Task not found");
        return this.transformResponse(
            await this.sanitizeOutput(entity, ctx)
        );
    }
}));