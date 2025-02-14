"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RatingReview from "../others/RatingReview";
import ProductOptions from "./ProductOptions";
import { updateRecentProducts } from "@/lib/getRecentProducts";

const SingleProductCartView = ({ product }: { product: any }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const {
    Title,
    Description,
    isRelevant,
    Ratings,
    Price,
    SLUG,

    Product_image,
    sub_category,
  } = product;

  const handleProductClick = (product: any) => {
    updateRecentProducts(product);
    router.push(`/product/${SLUG}/${product.product_variants[0].SKU}`);
  };

  // Get first image
  const imageUrl = Product_image?.[0]?.Image?.url || "/default-image.jpg";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      onClick={() => handleProductClick(product)}
      className="relative border rounded-xl shadow-lg overflow-hidden group h-[24rem] flex flex-col"
    >
      {/* Product Image */}
      <div className="w-full bg-gray-200 h-[12rem] flex justify-center items-center overflow-hidden">
        <Image
          className="object-cover"
          src={"http://localhost:1337" + imageUrl}
          alt={Title}
          width={300}
          height={180}
        />
      </div>

      {/* Product Options */}
      <div className="hidden group-hover:block absolute top-16 right-2">
        <ProductOptions product={product} />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow justify-between p-4">
        <div>
          {/* Category */}
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

          {/* Title */}
          <h3 className="text-xl font-bold capitalize hover:text-green-500">
            {Title}
          </h3>

          {/* Rating */}
          <RatingReview rating={Ratings} review={20} />
        </div>

        {/* Price */}
        <div className="text-lg font-bold">
          <span className="text-xl font-bold text-green-500">${Price}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCartView;
