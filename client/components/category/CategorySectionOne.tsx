"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CategorySectionOne = ({ categories }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams);
    // params.set("category", category);
    router.push(`/product?category=${category}`);
    window.scrollTo(0, 0);
  };
  console.log(categories);

  return (
    <section className="py-16 bg-slate-300 dark:bg-slate-900">
      <div className="max-w-screen-xl mx-auto overflow-auto px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-center md:justify-between mb-12">
          <h2 className="text-3xl md:text-5xl !text-center md:text-start font-bold  text-gray-900 dark:text-white border-l-4 p-2 border-l-rose-500 ">
            {categories.Title}
          </h2>

          <Button variant={"outline"} className="hidden md:block" size={"sm"}>
            <Link href={categories.Button.call_to_action}>
              {categories.Button.Title}
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.categories.map((category: any) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.SLUG)}
              className="p-4 rounded-lg shadow-md w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 cursor-pointer"
            >
              <div className="relative w-[8rem] h-[8rem]">
                <Image
                  className="object-cover"
                  src={"http://localhost:1337" + category.Image.Image.url}
                  alt={category.Name}
                  width={156} // You can adjust the width and height if needed
                  height={156}
                />
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold hover:underline">
                  {category.Name}
                </p>
                {/* Add the description or any additional info here */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySectionOne;
