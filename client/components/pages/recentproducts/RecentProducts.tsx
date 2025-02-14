"use client";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import SingleProductCartView from "@/components/product/SingleProductCartView";
import React from "react";

const RecentProducts = () => {
  //   const products = [
  //     {
  //       id: 1,
  //       documentId: "ndooyeeagdb6xj1yom79v2mk",
  //       Title: "Apple iPhone 14 Pro",
  //       Description:
  //         "6.1-inch Super Retina XDR display, A16 Bionic chip, and triple-lens camera.",
  //       createdAt: "2025-02-03T06:46:32.920Z",
  //       updatedAt: "2025-02-04T05:49:16.564Z",
  //       publishedAt: null,
  //       locale: null,
  //       Ratings: 4.9,
  //       Price: "999",
  //       SLUG: "apple-i-phone-14-pro",
  //       isRelevant: false,
  //       Product_image: [
  //         {
  //           id: 71,
  //           alt: "Apple iPhone 14 Pro",
  //           Image: {
  //             id: 32,
  //             documentId: "r8b1okagw31pvcbva8t7lmne",
  //             name: "th (11).jpeg",
  //             alternativeText: null,
  //             caption: null,
  //             width: 474,
  //             height: 474,
  //             formats: {
  //               thumbnail: {
  //                 name: "thumbnail_th (11).jpeg",
  //                 hash: "thumbnail_th_11_f3be6f1456",
  //                 ext: ".jpeg",
  //                 mime: "image/jpeg",
  //                 path: null,
  //                 width: 156,
  //                 height: 156,
  //                 size: 4,
  //                 sizeInBytes: 3998,
  //                 url: "/uploads/thumbnail_th_11_f3be6f1456.jpeg",
  //               },
  //             },
  //             hash: "th_11_f3be6f1456",
  //             ext: ".jpeg",
  //             mime: "image/jpeg",
  //             size: 16.87,
  //             url: "/uploads/th_11_f3be6f1456.jpeg",
  //             previewUrl: null,
  //             provider: "local",
  //             provider_metadata: null,
  //             folderPath: "/",
  //             createdAt: "2025-02-03T11:22:41.529Z",
  //             updatedAt: "2025-02-03T11:22:41.529Z",
  //             publishedAt: "2025-02-03T11:22:41.530Z",
  //             locale: null,
  //           },
  //         },
  //         {
  //           id: 72,
  //           alt: "Apple iPhone 14 Pro",
  //           Image: {
  //             id: 33,
  //             documentId: "d11t4u7fhh2g1gg8sjplzom5",
  //             name: "th (12).jpeg",
  //             alternativeText: null,
  //             caption: null,
  //             width: 474,
  //             height: 474,
  //             formats: {
  //               thumbnail: {
  //                 name: "thumbnail_th (12).jpeg",
  //                 hash: "thumbnail_th_12_3a8b7d7d97",
  //                 ext: ".jpeg",
  //                 mime: "image/jpeg",
  //                 path: null,
  //                 width: 156,
  //                 height: 156,
  //                 size: 4.07,
  //                 sizeInBytes: 4074,
  //                 url: "/uploads/thumbnail_th_12_3a8b7d7d97.jpeg",
  //               },
  //             },
  //             hash: "th_12_3a8b7d7d97",
  //             ext: ".jpeg",
  //             mime: "image/jpeg",
  //             size: 17.94,
  //             url: "/uploads/th_12_3a8b7d7d97.jpeg",
  //             previewUrl: null,
  //             provider: "local",
  //             provider_metadata: null,
  //             folderPath: "/",
  //             createdAt: "2025-02-03T11:23:11.453Z",
  //             updatedAt: "2025-02-03T11:23:11.453Z",
  //             publishedAt: "2025-02-03T11:23:11.454Z",
  //             locale: null,
  //           },
  //         },
  //       ],
  //       sub_category: {
  //         id: 1,
  //         documentId: "lsvnnnnrdr3fv3f65jdqtih0",
  //         Name: "Smartphones & Accessories",
  //         SLUG: "smartphones-and-accessories",
  //         createdAt: "2025-01-31T10:23:11.148Z",
  //         updatedAt: "2025-02-06T20:46:00.183Z",
  //         publishedAt: null,
  //         locale: null,
  //         category: {
  //           id: 1,
  //           documentId: "vf4zspxl5cqwx9edh761uxri",
  //           Name: "Electronics",
  //           SLUG: "electronics",
  //           createdAt: "2025-01-31T10:21:34.135Z",
  //           updatedAt: "2025-02-03T10:49:01.364Z",
  //           publishedAt: null,
  //           locale: null,
  //         },
  //       },
  //       seo: {
  //         id: 34,
  //         metaTitle: "Apple iPhone 14 Pro",
  //         metaKeywords: "iphone, Apple, 14 ,pro",
  //         metaDescription:
  //           "6.1-inch Super Retina XDR display, A16 Bionic chip, and triple-lens camera.",
  //         Allow_Indexing: null,
  //         schema: {
  //           test: "Apple iPhone 14 Pro",
  //         },
  //         Share_Image: {
  //           id: 235,
  //           alt: "Apple iPhone 14 Pro",
  //           Image: {
  //             id: 32,
  //             documentId: "r8b1okagw31pvcbva8t7lmne",
  //             name: "th (11).jpeg",
  //             alternativeText: null,
  //             caption: null,
  //             width: 474,
  //             height: 474,
  //             formats: {
  //               thumbnail: {
  //                 name: "thumbnail_th (11).jpeg",
  //                 hash: "thumbnail_th_11_f3be6f1456",
  //                 ext: ".jpeg",
  //                 mime: "image/jpeg",
  //                 path: null,
  //                 width: 156,
  //                 height: 156,
  //                 size: 4,
  //                 sizeInBytes: 3998,
  //                 url: "/uploads/thumbnail_th_11_f3be6f1456.jpeg",
  //               },
  //             },
  //             hash: "th_11_f3be6f1456",
  //             ext: ".jpeg",
  //             mime: "image/jpeg",
  //             size: 16.87,
  //             url: "/uploads/th_11_f3be6f1456.jpeg",
  //             previewUrl: null,
  //             provider: "local",
  //             provider_metadata: null,
  //             folderPath: "/",
  //             createdAt: "2025-02-03T11:22:41.529Z",
  //             updatedAt: "2025-02-03T11:22:41.529Z",
  //             publishedAt: "2025-02-03T11:22:41.530Z",
  //             locale: null,
  //           },
  //         },
  //       },
  //     },
  //   ];
  const products = JSON.parse(localStorage.getItem("recentProducts") as string);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="py-2">
        <BreadcrumbComponent currentPage="Recent Products" />
      </div>
      {products ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <SingleProductCartView product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg">No products available</p>
        </div>
      )}
    </div>
  );
};

export default RecentProducts;
