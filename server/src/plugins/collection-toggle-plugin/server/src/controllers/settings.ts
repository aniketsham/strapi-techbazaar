import type { Core } from '@strapi/strapi';

const settings = ({ strapi }: { strapi: Core.Strapi }) => ({
  async find(ctx) {
    const settings = await strapi.plugin('collection-toggle-plugin').service('settings').get();
    return ctx.send(settings);
  },
  async update(ctx) {
    console.log(ctx.request.body.body);
    const { selectedContentTypes } = ctx.request.body.body;
    await strapi
      .plugin('collection-toggle-plugin')
      .service('settings')
      .update({ selectedContentTypes });
    const settings = await strapi.plugin('collection-toggle-plugin').service('settings').get();

    return ctx.send({ success: true, settings });
  },
});

export default settings;
