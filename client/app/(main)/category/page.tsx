import CategoryListPage from "@/components/pages/category-pages/CategoryListPage";
import React from "react";

export const generateMetadata = async () => {
  return {
    title: "Category Page | Tech Bazaar",
    description: "Category Page",
    keywords:
      "Category, tech, bazar, smartphone, smartwatches, mobile , fashion , haircare, skincare, oils",
    openGraph: {
      type: "website",
      url: "http://localhost:3000/category",
      title: "Category Page",
      description: "Category Page",
      siteName: "Category Page",
    },
  };
};

const page = () => {
  const jsonLD = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "CategoryPage",
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Unique identifier for the category page",
      },
      name: {
        type: "string",
        description: "Category name",
      },
      slug: {
        type: "string",
        description: "SEO-friendly URL slug for the category",
      },
      description: {
        type: "string",
        description: "Short description of the category",
      },
      seo: {
        type: "object",
        description: "SEO metadata for the category page",
        properties: {
          title: {
            type: "string",
            description: "SEO title of the category page",
          },
          meta_description: {
            type: "string",
            description: "SEO meta description",
          },
          keywords: {
            type: "array",
            items: {
              type: "string",
            },
            description: "SEO keywords for the category page",
          },
          canonical_url: {
            type: "string",
            format: "uri",
            description: "Canonical URL for the category page",
          },
          og: {
            type: "object",
            description: "Open Graph metadata",
            properties: {
              og_title: {
                type: "string",
                description: "Open Graph title",
              },
              og_description: {
                type: "string",
                description: "Open Graph description",
              },
              og_image: {
                type: "string",
                format: "uri",
                description: "URL of the Open Graph image",
              },
              og_type: {
                type: "string",
                enum: ["website", "article"],
                description: "Type of Open Graph content",
              },
            },
          },
          twitter: {
            type: "object",
            description: "Twitter Card metadata",
            properties: {
              twitter_card: {
                type: "string",
                enum: ["summary", "summary_large_image"],
                description: "Type of Twitter Card",
              },
              twitter_title: {
                type: "string",
                description: "Twitter Card title",
              },
              twitter_description: {
                type: "string",
                description: "Twitter Card description",
              },
              twitter_image: {
                type: "string",
                format: "uri",
                description: "URL of the Twitter Card image",
              },
            },
          },
        },
      },
      products: {
        type: "array",
        description: "List of products under this category",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique product ID",
            },
            name: {
              type: "string",
              description: "Product name",
            },
            url: {
              type: "string",
              format: "uri",
              description: "Product page URL",
            },
            image: {
              type: "string",
              format: "uri",
              description: "Product image URL",
            },
          },
        },
      },
    },
    required: ["id", "name", "slug", "seo"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <CategoryListPage />
    </>
  );
};

export default page;
