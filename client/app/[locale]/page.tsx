import HomePageOne from "@/components/pages/home-pages/HomePageOne";
import HomePageTwo from "@/components/pages/home-pages/HomePageTwo";
import axios from "axios";
const getHomeData = async () => {
  try {
    const response: any = await axios.get("http://localhost:1337/api/home");
    let data = response;
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const generateMetadata = async () => {
  const data: any = await getHomeData();

  return {
    title: data.seo.metaTitle,
    description: data.seo.metaDescription,
    keywords: data.seo.metaKeywords,
    openGraph: {
      type: "website",
      url: "http://localhost:3000",
      title: data.seo.metaTitle,
      description: data.seo.metaDescription,
      siteName: data.seo.metaTitle,
      images: [
        {
          url: "http://localhost:1337" + data.seo.Share_Image.Image.url,
        },
      ],
    },
  };
};

export default async function Home({ params }: any) {
  const data = await getHomeData();
  const jsonLD = data.seo.schema;
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <HomePageOne data={data} locale={params.locale} />
      {/* <HomePageTwo /> */}
    </main>
  );
}
