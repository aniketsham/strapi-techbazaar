"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
const SubCategoryListPage = ({ params }: any) => {
  const [category, setCategory] = useState<any>();
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const resposne = await axios.get(
          `http://localhost:1337/api/categories?filters[SLUG][$eq]=${params.slug}`
        );
        console.log(params.slug);
        console.log(resposne.data[0], "resposne");
        setCategory(resposne.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getCategoryDetails();
  }, []);

  console.log(category);
  if (!category) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      {category && (
        <div
          key={category.id}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            {category.Name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.sub_categories.map((sub: any) => (
              <div
                key={sub.id}
                className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                <Image
                  className="object-cover w-full h-64"
                  src={"http://localhost:1337" + sub.Image.Image.url}
                  alt={sub.Name}
                  width={300} // You can adjust the width and height if needed
                  height={300}
                  unoptimized
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {sub.Name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {sub.SLUG.replace(/-/g, " ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubCategoryListPage;
