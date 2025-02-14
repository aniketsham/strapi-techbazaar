/**
 * product controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async find(ctx) {
      const { query } = ctx;

      const products = await strapi.documents("api::product.product").findMany({
        ...query,
        populate: {
          Product_image: {
            populate: "*",
          },
          product_variants: {
            populate: "*",
          },
          sub_category: {
            populate: "category",
          },
          seo: {
            populate: {
              Share_Image: {
                populate: "*",
              },
            },
          },
        },
      });

      return products;
    },
  })
);
