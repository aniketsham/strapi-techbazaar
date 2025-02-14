"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RatingReview from "../others/RatingReview";
import AddToWishlistBtn from "../buttons/AddToWishlistBtn";
import AddToCartBtn from "../buttons/AddToCartBtn";
import { useRouter } from "next/navigation";
import { updateRecentProducts } from "@/lib/getRecentProducts";

const SingleProductListView = ({ product }: { product: any }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const {
    id,
    Title,
    Description,
    Ratings,
    Price,
    isRelevant,
    SLUG,
    Product_image,
    sub_category,
  } = product;
  const handleProductClick = (product: any) => {
    console.log("User clicked on product:", product);
    updateRecentProducts(product);
    // Perform any other action here (e.g., analytics, API call, etc.)
    router.push(`/product/${SLUG}/${product.product_variants[0].SKU}`);
  };
  // Get first image
  const imageUrl = Product_image?.[0]?.Image?.url || "/default-image.jpg";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      onClick={() => handleProductClick(product)}
      className="group flex flex-col lg:flex-row lg:items-start items-center justify-center gap-4 relative space-y-4 p-4 md:p-8 border"
    >
      <div className="flex-shrink-0 w-[20rem] h-[18rem] relative rounded-md overflow-hidden bg-gray-200">
        <Image
          src={"http://localhost:1337" + imageUrl}
          alt={Title}
          fill
          className="object-contain"
        />
      </div>
      <div>
        <p
          onClick={(e) => {
            e.preventDefault();
            router.push(`/category/${sub_category.category.SLUG}`);
          }}
          className="text-sm text-sky-500 font-light mb-2 hover:opacity-60 cursor-pointer"
        >
          {sub_category.category.Name}
        </p>

        {/* Relevant Badge */}
        {isRelevant && (
          <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full shadow-sm mt-1">
            ✅ Relevant
          </span>
        )}
        <h3 className="text-2xl font-bold hover:text-green-500">
          {Title.slice(0, 45)}
          {Title.length > 45 && "..."}
        </h3>
        <RatingReview rating={Ratings} review={20} />
        <div className="text-lg font-bold space-x-2 my-4">
          <span className="text-xl font-bold text-green-500">${Price}</span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {Description.slice(0, 100)}...
        </div>
        <div
          className="flex flex-col md:flex-row mt-4 items-center gap-2 max-w-96 ml-auto justify-end"
          onClick={(e) => e.preventDefault()}
        >
          <AddToWishlistBtn product={product} />
          <AddToCartBtn
            product={{ ...product, quantity: 1, selectedColor: "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProductListView;
