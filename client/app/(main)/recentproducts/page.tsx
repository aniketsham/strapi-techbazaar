import RecentProducts from "@/components/pages/recentproducts/RecentProducts";
import React from "react";

export const generateMetadata = async () => {
  return {
    title: "Recent Products | Tech Bazaar",
  };
};

const page = () => {
  return (
    <div>
      <RecentProducts />
    </div>
  );
};

export default page;
