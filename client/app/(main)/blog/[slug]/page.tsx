import BlogTitlePage from "@/components/pages/blog-pages/BlogPage";
import axios from "axios";
import React from "react";
const getBlog = async (slug: string) => {
  try {
    const response: any = await axios.get(
      `http://localhost:1337/api/blogs?populate[Image][populate]=*&populate[Tags][populate]=*&populate[seo][populate][Share_Image][populate]=*&filters[SLUG][$eq]=${slug}`
    );
    console.log(response.data.data[0]);
    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
};
export const generateMetadata = async ({ params }: any) => {
  const data = await getBlog(params.slug);
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
      <BlogTitlePage params={params} />
    </div>
  );
};

export default page;
