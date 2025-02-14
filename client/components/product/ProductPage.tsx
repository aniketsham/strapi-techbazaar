"use client";
import ProductGallery from "@/components/product/ProductGallery";
import RelatedProducts from "@/components/products/RelatedProducts";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import ProductDetails from "@/components/product/ProductDetails";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SkeletonLoader from "../ui/skeletonloader";

const ProductPage = ({ slug, SKU }: { slug: string; SKU?: string }) => {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [skuLoading, setSkuLoading] = useState<boolean>(false);
  const [currentSKU, setCurrentSKU] = useState<string | undefined>(SKU);

  useEffect(() => {
    const fetchProduct = async () => {
      if (product?.SLUG === slug) return;
      setLoading(true);

      try {
        const response = await fetch(
          `http://localhost:1337/api/products?filters[SLUG][$eq]=${slug}`
        );
        const data = await response.json();

        if (data.length > 0) {
          setProduct(data[0]);
          if (!SKU && data[0].SKUs?.length > 0) {
            setCurrentSKU(data[0].SKUs[0]); // Set default SKU if not provided
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug, SKU]);

  useEffect(() => {
    if (!product) return;
    setSkuLoading(true);
    setTimeout(() => setSkuLoading(false), 500);
  }, [currentSKU]);

  useEffect(() => {
    const getRelatedProducts = async () => {
      if (!product || !product.sub_category?.category?.SLUG) return;

      try {
        const relatedResponse = await fetch(
          `http://localhost:1337/api/products?filters[sub_category][category][SLUG][$eq]=${product.sub_category.category.SLUG}`
        );
        const relatedData = await relatedResponse.json();

        const filteredProducts = relatedData.filter(
          (item: { SLUG: string }) => item.SLUG !== slug
        );

        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (product) getRelatedProducts();
  }, [product]);

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-8 flex flex-col items-start gap-2 min-h-screen">
      <div className="my-2">
        <BreadcrumbComponent
          pages={[
            {
              name: product?.sub_category?.category?.Name,
              link: `/product?category=${product?.sub_category?.category?.SLUG}`,
            },
            {
              name: product?.sub_category?.Name,
              link: `/product?subCategory=${product?.sub_category?.category?.SLUG}/${product?.sub_category?.SLUG}`,
            },
          ]}
          currentPage={product?.Title}
        />
      </div>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          <ProductGallery
            isInModal={false}
            images={product?.Product_image.map(
              (img: any) => "http://localhost:1337" + img.Image.url
            )}
          />
          {skuLoading ? (
            <SkeletonLoader />
          ) : (
            <ProductDetails product={product} SKU={currentSKU as string} />
          )}
        </div>
      )}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductPage;
