"use client";
import { blogPosts } from "@/data/blog/blogData";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const PopularPosts = ({ tags }: any) => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    const getRelatedBlogs = async () => {
      try {
        if (!tags || tags.length === 0) return; // Ensure tags exist

        const tagFilters = tags
          .map(
            (tag: any) =>
              `filters[Tags][Tag][$eq]=${encodeURIComponent(tag.Tag)}`
          )
          .join("&");

        const response = await axios.get(
          `http://localhost:1337/api/blogs?populate[Image][populate]=*&${tagFilters}`
        );

        // const response = await axios.get(0
        //   `http://localhost:1337/api/blogs?populate[Image][populate]=*&filters[Tags][Tag][$eq]=${tags[].Tag}`
        // );
        // // alert(JSON.stringify(response.data.data));
        setBlogPosts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRelatedBlogs();
  }, []);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Related Posts
        </h2>
        <ul className="space-y-4">
          {blogPosts.map((post) => (
            <li key={post.Title} className="flex items-center space-x-4">
              {/* Display post thumbnail */}
              <div className="flex-shrink-0 relative h-12 w-12 rounded-lg overflow-hidden">
                <Image
                  src={"http://localhost:1337" + post.Image.Image.url}
                  alt={post.Title}
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="flex-1">
                <Link
                  href={`/blog/${encodeURIComponent(post.SLUG)}`}
                  className="text-gray-900 dark:text-white text-lg font-medium block hover:opacity-60"
                >
                  {post.Title}
                </Link>
                {/* <small className="text-gray-600 dark:text-gray-300 block">
                  {post.date?.toDateString()}
                </small> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PopularPosts;
