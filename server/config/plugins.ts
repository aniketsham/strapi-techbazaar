export default ({ env }) => ({
  "strapi-algolia": {
    enabled: true,
    config: {
      apiKey: env("ALGOLIA_ADMIN_KEY"),
      applicationId: env("ALGOLIA_APP_ID"),
      contentTypes: [
        {
          name: "api::product.product",
          populate: {
            Product_image: {
              populate: "*",
            },
            sub_category: {
              populate: "category",
            },
          },
        },

        // ...
      ],
    },
  },

  "custom-input-field": {
    enabled: true,
    resolve: "./src/plugins/custom-input-field",
  },
  "collection-toggle-plugin": {
    enabled: true,
    resolve: "./src/plugins/collection-toggle-plugin",
  },
});
