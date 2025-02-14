import BlogPageTwo from "@/components/pages/blog-pages/BlogPageTwo";
import React from "react";

export const generateMetadata = async () => {
  return {
    title: "Blog Page | Tech Bazaar",
    description: "Blog Page",
    keywords:
      "Blog, tech, bazar, smartphone, smartwatches, mobile , fashion , haircare, skincare, oils",
    openGraph: {
      type: "website",
      url: "http://localhost:3000/blog",
      title: "Blog Page",
      description: "Blog Page",
      siteName: "Blog Page",
    },
  };
};

const BlogPage = () => {
  const jsonLD = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "BlogPage",
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Unique identifier for the blog page",
      },
      title: {
        type: "string",
        description: "Title of the blog page",
      },
      slug: {
        type: "string",
        description: "SEO-friendly URL slug for the blog",
      },
      description: {
        type: "string",
        description: "Short description of the blog page",
      },
      seo: {
        type: "object",
        description: "SEO metadata for the blog page",
        properties: {
          title: {
            type: "string",
            description: "SEO title of the blog page",
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
            description: "SEO keywords for the blog page",
          },
          canonical_url: {
            type: "string",
            format: "uri",
            description: "Canonical URL for the blog page",
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
      blogs: {
        type: "array",
        description: "List of blogs on this page",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique blog ID",
            },
            title: {
              type: "string",
              description: "Blog title",
            },
            url: {
              type: "string",
              format: "uri",
              description: "Blog page URL",
            },
            image: {
              type: "string",
              format: "uri",
              description: "Blog featured image URL",
            },
            author: {
              type: "string",
              description: "Author of the blog",
            },
            published_date: {
              type: "string",
              format: "date-time",
              description: "Publication date of the blog",
            },
          },
        },
      },
    },
    required: ["id", "title", "slug", "seo"],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <BlogPageTwo />
    </div>
  );
};

export default BlogPage;
