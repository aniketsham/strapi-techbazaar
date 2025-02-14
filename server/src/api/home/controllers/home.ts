/**
 * home controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::home.home",
  ({ strapi }) => ({
    async find(ctx) {
      const { query } = ctx;
      const locale: string = (ctx.query.locale as string) || "fr"; // Get locale from query params (default: "en")
      console.log(locale);
      const home = await strapi.documents("api::home.home").findOne({
        documentId: "t2k8by2sq7f5zm1k7unsbkct",
        locale,
        // Apply locale to the whole request
        populate: {
          banners: {
            populate: {
              Media_zone: {
                on: {
                  "common.image-banner": {
                    populate: {
                      Desktop_image: {
                        populate: "*",
                      },
                      Mobile_image: {
                        populate: "*",
                      },
                    },
                  },
                  "common.video-banner": {
                    populate: {
                      Desktop_video: {
                        populate: "*",
                      },
                      Mobile_video: {
                        populate: "*",
                      },
                    },
                  },
                },
              },
              Button: {
                populate: "*",
              },
            },
          },
          Section: {
            on: {
              "section.category-section": {
                populate: {
                  categories: {
                    populate: {
                      Image: {
                        populate: "*",
                      },
                    },
                  },
                  Button: {
                    populate: "*",
                  },
                },
              },
              "section.advantage-section": {
                populate: {
                  advantages: {
                    populate: {
                      Icon: {
                        populate: "*",
                      },
                      localizations: {
                        populate: "*",
                      },
                    },
                  },
                },
                // Ensure localized version is fetched
              },
              "section.testimonial-section": {
                populate: "*",
              },
            },
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

      return home;
    },
  })
);
