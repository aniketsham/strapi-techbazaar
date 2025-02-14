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
  "strapi-plugin-ckeditor": {
    mediaEmbed: {
      previewsInData: true,
    },
  },
});
