"use client";
import BreadcrumbComponent from "@/components/others/Breadcrumb";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BlogPageTwo = () => {
  const [blogData, setBlogData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/blogs?populate[Image][populate]=*"
        );
        setBlogData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getBlogData();
  }, []);

  if (!blogData.length) return <h1>Loading...</h1>;

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogData.length / postsPerPage);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <div className="py-2">
        <BreadcrumbComponent
          //pages={[{ name: "Blog", link: "/blog" }]}
          currentPage="Blog"
        />
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post: any) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
          >
            <div className="relative w-full h-[16rem]">
              <Image
                src={`http://localhost:1337${post.Image?.Image?.url}`}
                fill
                alt={post.Title}
                className="w-full h-[16rem] object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {post.Title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {new Date(post.createdAt).toDateString()}
              </p>
              <p className="text-gray-700 dark:text-gray-400">{post.Summary}</p>
              <div className="flex items-center justify-between mt-4">
                <Link
                  href={`/blog/${post.SLUG}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogPageTwo;
