"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import ProductTab from "./ProductTab";
import BuyNowBtn from "../buttons/BuyNowBtn";
import AddToCartBtn from "../buttons/AddToCartBtn";
import ProductQuantityChange from "./ProductQuantityChange";
import RatingReview from "../others/RatingReview";
import ProductDescription from "./ProductDescription";
import ProductColorSelection from "./ProductColorSelection";
import { Product } from "@/types";
import Link from "next/link";
import { calculateDiscount } from "@/lib/calculateDiscount";
import ProductSelection from "./ProductSelection";

const ProductDetails = ({ product, SKU }: { product: any; SKU: string }) => {
  const router = useRouter();

  // Find the variant that matches the SKU
  const selectedVariant = product.product_variants?.find(
    (variant: any) => variant.SKU === SKU
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    selectedVariant?.Colors || product.product_variants?.[0]?.Colors || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedVariant?.Sizes || ""
  );
  const [selectedMaterial, setSelectedMaterial] = useState(
    selectedVariant?.Materials || ""
  );

  useEffect(() => {
    const newVariant = product.product_variants?.find(
      (variant: any) =>
        variant.Colors === selectedColor &&
        variant.Sizes === selectedSize &&
        variant.Materials === selectedMaterial
    );
    if (newVariant) {
      router.push(`/product/${product.SLUG}/${newVariant.SKU}`, undefined);
    }
  }, [selectedColor, selectedSize, selectedMaterial]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const firstVariant = product.product_variants?.find(
      (variant: any) => variant.Colors === color
    );
    if (firstVariant) {
      setSelectedSize(firstVariant.Sizes || "");
      setSelectedMaterial(firstVariant.Materials || "");
      router.push(`/product/${product.SLUG}/${firstVariant.SKU}`, undefined);
    }
  };

  return (
    <div className="space-y-2 mt-2">
      {/* Category */}
      <Link
        href={`/shop?category=${product.sub_category.category?.slug}`}
        className="bg-lime-500 py-1 px-4 rounded-full w-fit"
      >
        {product.sub_category.category?.Name}
      </Link>
      {product.isRelevant && (
        <div className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full shadow-sm">
          ✅ Relevant
        </div>
      )}
      {/* Product Name */}
      <h2 className="text-2xl md:text-3xl font-bold capitalize">
        {product.Title}
      </h2>
      {/* Rating and Review */}
      <RatingReview
        rating={product.Ratings || 0}
        review={product.reviews || 0}
      />
      {/* Product Description */}
      <ProductDescription description={product.Description} />

      {/* Product stock */}
      <div>
        <p className="text-lg w-fit rounded-md text-muted-foreground">
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>
      </div>

      {/* Product Colors */}
      <ProductColorSelection
        color={selectedColor}
        setColor={handleColorChange}
        allColors={Array.from(
          new Set(
            product.product_variants?.map((variant: any) => variant.Colors) ||
              []
          )
        )}
      />

      <ProductSelection
        selectedOption={selectedSize}
        setOption={setSelectedSize}
        allOptions={Array.from(
          new Set(
            product.product_variants
              ?.filter((variant: any) => variant.Colors === selectedColor)
              .map((variant: any) => variant.Sizes) || []
          )
        )}
        label="Select Size"
        isVisible={product.product_variants?.some(
          (variant: any) => variant.Colors === selectedColor
        )}
      />

      <ProductSelection
        selectedOption={selectedMaterial}
        setOption={setSelectedMaterial}
        allOptions={Array.from(
          new Set(
            product.product_variants
              ?.filter((variant: any) => variant.Colors === selectedColor)
              .map((variant: any) => variant.Materials) || []
          )
        )}
        label="Select Material"
        isVisible={product.product_variants?.some(
          (variant: any) => variant.Colors === selectedColor
        )}
      />

      <div className="flex items-center gap-6">
        <div className="">
          {/* Original Price */}
          <p className="text-muted-foreground line-through text-2xl">
            ${product.Price}
          </p>
          <div className="flex items-center gap-4">
            {/* Discounted Price */}
            <p className="text-3xl font-bold text-green-500 border-green-500 border py-2 px-6 rounded-lg">
              ${product.Price}
            </p>
            <ProductQuantityChange
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 !my-6">
        {/* Add To Cart Button */}
        <AddToCartBtn product={{ ...product, quantity, selectedColor }} />
        {/* Buy Now Button */}
        <BuyNowBtn product={{ ...product, quantity, selectedColor }} />
      </div>
    </div>
  );
};

export default ProductDetails;
