import NewsPage from "@/components/pages/news-pages/NewsPage";
import React from "react";

export const generateMetadata = async () => {
  return {
    title: "News Page | Tech Bazaar",
    description: "Tech Bazaar News Page",
    keywords:
      "tech, bazaar, smartphone, smartwatches, mobile, fashion, haircare, skincare, oils",
    openGraph: {
      type: "website",
      url: "http://localhost:3000/news",
      title: "News Page",
      description: "Tech Bazaar News Page",
      siteName: "Tech Bazaar",
    },
  };
};

const page = () => {
  const jsonLD = {
    test: "News Page",
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <NewsPage />
    </>
  );
};

export default page;
