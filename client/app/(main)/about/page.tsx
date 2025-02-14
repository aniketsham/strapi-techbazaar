import NewsLetterTwo from "@/components/newsLetter/NewsLetterTwo";
import AboutPageTwo from "@/components/pages/about-pages/AboutPageTwo";
import React from "react";

export const generateMetadata = async () => {
  return {
    title: "About Page | Tech Bazaar",
    description: "About Page",
    keywords:
      "About, tech, bazar, smartphone, smartwatches, mobile , fashion , haircare, skincare, oils",
    openGraph: {
      type: "website",
      url: "http://localhost:3000/about",
      title: "About Page",
      description: "About Page",
      siteName: "About Page",
    },
  };
};
const AboutPage = () => {
  const jsonLD = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "AboutUsPage",
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Unique identifier for the about us page",
      },
      title: {
        type: "string",
        description: "Title of the about us page",
      },
      slug: {
        type: "string",
        description: "SEO-friendly URL slug for the about us page",
      },
      seo: {
        type: "object",
        description: "SEO metadata for the about us page",
        properties: {
          title: {
            type: "string",
            description: "SEO title of the about us page",
          },
          meta_description: {
            type: "string",
            description: "SEO meta description",
          },
          canonical_url: {
            type: "string",
            format: "uri",
            description: "Canonical URL for the about us page",
          },
        },
      },
      content: {
        type: "string",
        description: "Main content of the about us page",
      },
      team: {
        type: "array",
        description: "List of team members",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the team member",
            },
            role: {
              type: "string",
              description: "Role or designation of the team member",
            },
            image: {
              type: "string",
              format: "uri",
              description: "Profile image URL of the team member",
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

      <AboutPageTwo />
    </div>
  );
};

export default AboutPage;
