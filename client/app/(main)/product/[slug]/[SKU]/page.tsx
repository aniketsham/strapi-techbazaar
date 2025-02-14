import ProductPage from "@/components/product/ProductPage";
import React from "react";

const fetchProduct = async (slug: string) => {
  try {
    const response = await fetch(
      `http://localhost:1337/api/products?filters[SLUG][$eq]=${slug}`
    );
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};
export const generateMetadata = async ({ params }: any) => {
  const data = await fetchProduct(params.slug);
  console.log(data);
  return {
    title: data?.seo.metaTitle,
    description: data?.seo.metaDescription,
    keywords: data?.seo.metaKeywords,
    openGraph: {
      type: "website",
      url: "http://localhost:3000",
      title: data?.seo.metaTitle,
      description: data?.seo.metaDescription,
      siteName: data?.seo.metaTitle,
      images: [
        {
          url: "http://localhost:1337" + data?.seo.Share_Image.Image.url,
        },
      ],
    },
  };
};

const page = ({ params }: any) => {
  return (
    <div>
      <ProductPage slug={params.slug} SKU={params.SKU} />
    </div>
  );
};

export default page;

//
