import ContactPageTwo from "@/components/pages/contact-pages/ContactPageTwo";
import React from "react";

export const generateMetadata = async () => {
  return {
    title: "Contact Page | Tech Bazaar",
    description: "Contact Page",
    keywords:
      "Contact, tech, bazar, smartphone,enquiry, smartwatches,email, mobile , fashion , haircare, skincare, oils",
    openGraph: {
      type: "website",
      url: "http://localhost:3000/contact",
      title: "Contact Page",
      description: "Contact Page",
      site_name: "Contact Page",
    },
  };
};

const ContactPage = () => {
  const jsonLD = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "ContactPage",
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Unique identifier for the contact page",
      },
      title: {
        type: "string",
        description: "Title of the contact page",
      },
      slug: {
        type: "string",
        description: "SEO-friendly URL slug for the contact page",
      },
      seo: {
        type: "object",
        description: "SEO metadata for the contact page",
        properties: {
          title: {
            type: "string",
            description: "SEO title of the contact page",
          },
          meta_description: {
            type: "string",
            description: "SEO meta description",
          },
          canonical_url: {
            type: "string",
            format: "uri",
            description: "Canonical URL for the contact page",
          },
        },
      },
      contact_info: {
        type: "object",
        description: "Contact details",
        properties: {
          email: {
            type: "string",
            format: "email",
            description: "Contact email address",
          },
          phone: {
            type: "string",
            description: "Contact phone number",
          },
          address: {
            type: "string",
            description: "Physical address of the contact location",
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

      <ContactPageTwo />
    </div>
  );
};

export default ContactPage;
