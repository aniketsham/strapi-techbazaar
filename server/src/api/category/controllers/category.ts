/**
 * category controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async find(ctx) {
      const { query } = ctx;
      const categories = await strapi
        .documents("api::category.category")
        .findMany({
          ...query,
          populate: {
            Image: {
              populate: "*",
            },
            sub_categories: {
              populate: {
                Image: {
                  populate: "*",
                },
              },
            },
          },
        });
      return categories;
    },
  })
);
