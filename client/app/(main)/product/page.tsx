import ShopPageOne from "@/components/pages/shop-pages/ShopPageOne";

import { SearchParams } from "@/types";
import React from "react";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  return {
    title: "Product Page | Tech Bazaar ",
    description: "Tech Bazaar Shop Page",
    keywords:
      "Product, tech, bazaar, smartphone, smartwatches, mobile, fashion,,sports, outdoor, haircare, skincare, oils",
    openGraph: {
      type: "website",
      url: "http://localhost:3000/shop",
      title: "Product Page",
      description: "Tech Bazaar Product Page",
      siteName: "Product Bazaar",
    },
  };
};
function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div>
      <ShopPageOne searchParams={searchParams} />
    </div>
  );
}

export default ShopPage;
