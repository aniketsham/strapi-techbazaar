"use client";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CategoryListPage = () => {
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/categories?populate=*&sort:createdAt:asc"
        );

        setCategoryList(response.data); // Corrected to access .data
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    getCategoryDetails();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-lg font-semibold dark:text-white">
        Loading...
      </p>
    );
  }

  if (!categoryList || categoryList.length === 0) {
    return (
      <p className="text-center text-lg font-semibold dark:text-white">
        No categories found.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900">
      <div className="py-2">
        <BreadcrumbComponent currentPage="Categories" />
      </div>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Categories & Subcategories
      </h2>

      <div className="space-y-10">
        {categoryList.map((category) => {
          const { Name, SLUG, sub_categories } = category;
          const ImageUrl: string = category.Image.Image.url;
          return (
            <div key={SLUG} className="border-b pb-6 dark:border-gray-700">
              {/* Category Header */}
              <div className="flex items-center gap-4">
                {ImageUrl && (
                  <Image
                    src={`http://localhost:1337${ImageUrl}`}
                    alt={Name}
                    width={80}
                    height={80}
                    unoptimized
                    className="rounded-lg object-cover"
                  />
                )}
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {Name}
                </h3>
              </div>

              {/* Subcategories */}
              {sub_categories?.length > 0 ? (
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sub_categories.map((sub: any) => {
                    const { Name, SLUG } = sub;
                    return (
                      <Link
                        key={SLUG}
                        href={`/product?subCategory=${SLUG}`}
                        className="group block border dark:border-gray-700 p-3 rounded-lg shadow-sm dark:shadow-md hover:shadow-md dark:hover:shadow-lg"
                      >
                        {sub.Image.Image.url && (
                          <Image
                            src={`http://localhost:1337${sub.Image.Image.url}`}
                            alt={Name}
                            width={150}
                            height={100}
                            className="w-full h-28 object-cover rounded-md"
                          />
                        )}
                        <p className="mt-2 text-center text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {Name}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="ml-6 text-gray-500 dark:text-gray-400 mt-2">
                  No subcategories available.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryListPage;
