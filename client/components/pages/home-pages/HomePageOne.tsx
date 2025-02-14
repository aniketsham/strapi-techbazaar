"use client";
import React, { Suspense, useEffect } from "react";
import HeroBannerOne from "@/components/hero/HeroBannerOne";
import ProductsCollectionOne from "@/components/products/ProductsCollectionOne";
import NewsLetterTwo from "@/components/newsLetter/NewsLetterTwo";
import LatestBlogPosts from "@/components/blog/LatestBlogPosts";
import CategoriesCollection from "@/components/category/CategoriesCollection";
import TestimonialsSection from "@/components/others/Testimonials";
import BannerOne from "@/components/banners/BannerOne";
import BenefitsSection from "@/components/others/BenefitSection";
import Loader from "@/components/others/Loader";
import axios from "axios";
import CategorySectionOne from "@/components/category/CategorySectionOne";

const HomePageOne = ({ data, locale }: { data: any; locale: string }) => {
  console.log(data);
  return (
    <section className="overflow-hidden">
      <HeroBannerOne locale={locale} banners={data.banners} />

      <Suspense fallback={<Loader />}>
        {data.Section.map((section: any, index: number) => {
          switch (section.__component) {
            case "section.category-section":
              return (
                <CategorySectionOne
                  key={index}
                  locale={locale}
                  categories={section}
                />
              );
            case "section.advantage-section":
              return (
                <BenefitsSection
                  key={index}
                  advantageData={section}
                  locale={locale}
                  textCenter={false}
                />
              );
            case "section.testimonial-section":
              return (
                <TestimonialsSection
                  key={index}
                  locale={locale}
                  testinomials={section}
                  textCenter={false}
                />
              );
            default:
              return null; // Skip unknown sections
          }
        })}
      </Suspense>

      <LatestBlogPosts locale={locale} twoColunmHeader={true} />
      {/* <NewsLetterTwo /> */}
    </section>
  );
};

export default HomePageOne;
