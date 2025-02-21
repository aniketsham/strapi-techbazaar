"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductTab from "./ProductTab";
import BuyNowBtn from "../buttons/BuyNowBtn";
import AddToCartBtn from "../buttons/AddToCartBtn";
import ProductQuantityChange from "./ProductQuantityChange";
import RatingReview from "../others/RatingReview";
import ProductDescription from "./ProductDescription";
import ProductColorSelection from "./ProductColorSelection";
import ProductSelection from "./ProductSelection";

const ProductDetails = ({ product, SKU }: { product: any; SKU: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Access query parameters

  // Get color and size from URL query params (if available)
  const urlColor = searchParams.get("color") || "";
  const urlSize = searchParams.get("size") || "";

  // Find the selected variant based on SKU
  const selectedVariant = product.product_variants?.find(
    (variant: any) => variant.SKU === SKU
  );

  // States for Quantity, Color, Size, and Material
  const [quantity, setQuantity] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState(
    selectedVariant?.Materials || ""
  );
  const [selectedSize, setSelectedSize] = useState(urlSize || selectedVariant?.SizeColor_variant?.[0]?.Size || "");
  const [selectedColor, setSelectedColor] = useState(urlColor || selectedVariant?.SizeColor_variant?.[0]?.Color || "");

  // Set URL params when the page first loads
  useEffect(() => {
    if (!urlColor && !urlSize && selectedVariant) {
      // Set initial values in URL if not already set
      const params = new URLSearchParams();
      params.set("color", selectedVariant.SizeColor_variant?.[0]?.Color);
      params.set("size", selectedVariant.SizeColor_variant?.[0]?.Size);

      // Update the URL with the parameters
      router.push(`?${params.toString()}`);
    }
  }, [urlColor, urlSize, selectedVariant, router]);

  // Effect to update the URL when size or color changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selectedColor) params.set("color", selectedColor);
    if (selectedSize) params.set("size", selectedSize);
    router.push(`?${params.toString()}`);
  }, [selectedColor, selectedSize, router]);

  // When selectedMaterial changes, find the first available Size and Color
  useEffect(() => {
    const selectedMaterialVariant = product.product_variants?.find(
      (variant: any) => variant.Materials === selectedMaterial
    );

    if (selectedMaterialVariant && selectedMaterialVariant.SizeColor_variant.length > 0) {
      // Automatically update size and color to the first available option
      const firstVariant = selectedMaterialVariant.SizeColor_variant[0];
      setSelectedSize(firstVariant.Size);
      setSelectedColor(firstVariant.Color);
    }
  }, [selectedMaterial, product.product_variants]);

  // Disable colors that are not available in the selected size
  const availableColorsForSize = product.product_variants
    ?.find((variant: any) => variant.Materials === selectedMaterial)
    ?.SizeColor_variant?.filter((sc: any) => sc.Size === selectedSize)
    .map((sc: any) => sc.Color);

  // Get unique materials from product variants
  const allMaterials = Array.from(
    new Set(product.product_variants?.map((variant: any) => variant.Materials) || [])
  );

  // Get size and color options based on the selected material
  const availableSizesAndColors = product.product_variants?.find(
    (variant: any) => variant.Materials === selectedMaterial
  );

  const availableSizes = availableSizesAndColors
    ? Array.from(
        new Set(availableSizesAndColors.SizeColor_variant?.map((sc: any) => sc.Size))
      )
    : [];

  const availableColors = availableSizesAndColors
    ? Array.from(
        new Set(availableSizesAndColors.SizeColor_variant?.map((sc: any) => sc.Color))
      )
    : [];

  return (
    <div className="space-y-2 mt-2">
      <Link
        href={`/product?category=${product.sub_category?.category?.SLUG}`}
        className="bg-lime-500 py-1 px-4 rounded-full w-fit"
      >
        {product.sub_category?.category?.Name}
      </Link>
      {product.isRelevant && (
        <div className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full shadow-sm">
          ✅ Relevant
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-bold capitalize">
        {product.Title}
      </h2>
      <RatingReview rating={product.Ratings || 0} review={product.reviews || 0} />
      <ProductDescription description={product.Description} />
      <div>
        <p className="text-lg w-fit rounded-md text-muted-foreground">
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>
      </div>

      {/* Material Selection */}
      <ProductSelection
        selectedOption={selectedMaterial}
        setOption={setSelectedMaterial}
        allOptions={allMaterials as string[]}
        label="Select Material"
        isVisible={true}
      />

      {/* Conditionally render Size and Color based on the selected Material */}
      {selectedMaterial && (
        <>
          <ProductSelection
            selectedOption={selectedSize}
            setOption={setSelectedSize}
            allOptions={availableSizes as string[]}
            label="Select Size"
            isVisible={availableSizes.length > 0}
          />

          <ProductColorSelection
            color={selectedColor}
            setColor={setSelectedColor}
            allColors={availableColorsForSize || []}
            disabledColors={availableColorsForSize ? [] : availableColors as string[]} // Disable unavailable colors
          />
        </>
      )}

      <div className="flex items-center gap-6">
        <div className="">
          <p className="text-muted-foreground line-through text-2xl">
            ${product.Price}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-green-500 border-green-500 border py-2 px-6 rounded-lg">
              ${product.Price}
            </p>
            <ProductQuantityChange quantity={quantity} setQuantity={setQuantity} />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 !my-6">
        <AddToCartBtn product={{ ...product, quantity, selectedColor }} />
        <BuyNowBtn product={{ ...product, quantity, selectedColor }} />
      </div>
    </div>
  );
};

export default ProductDetails;
