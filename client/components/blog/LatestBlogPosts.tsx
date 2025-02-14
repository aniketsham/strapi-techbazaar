import { blogPosts } from "@/data/blog/blogData";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";

const LatestBlogPosts = ({
  twoColunmHeader,
  locale,
}: {
  twoColunmHeader: boolean;
  locale: string;
}) => {
  // get latest blogs data from server here
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    const getBlogPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/blogs?sort[0]=createdAt:desc&populate[Image][populate]=*&pagination[page]=1&pagination[pageSize]=3"
        );
        console.log(response.data, "blogs");
        setBlogPosts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBlogPosts();
  }, []);
  return (
    <div className="py-16 bg-gray-300 dark:bg-gray-950">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {twoColunmHeader ? (
          <div className="flex flex-wrap items-center justify-center md:justify-between mb-12">
            <h2 className="text-3xl md:text-5xl !text-center md:text-start font-bold  text-gray-900 dark:text-white border-l-4 p-2 border-l-rose-500 ">
              Latest Blog Posts
            </h2>
            <Button variant={"outline"} className="hidden md:block" size={"sm"}>
              <Link href={"/blog"}>View All</Link>
            </Button>
          </div>
        ) : (
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12 border-l-4 border-l-rose-500 w-fit mx-auto p-2">
            Latest Blog Posts
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post: any) => (
            <div
              key={post.Title}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative w-full h-[15rem] mt-2">
                <Image
                  src={"http://localhost:1337" + post.Image.Image.url}
                  fill
                  alt={post.Title}
                  className="w-full h-48 object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {post.Title}
                </h3>
                {/* <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                  By {post.author} | {post?.date?.toDateString()}
                </p> */}
                <p className="text-gray-700 dark:text-gray-400">
                  {post.Summary.slice(0, 100)}...
                </p>
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
      </div>
    </div>
  );
};

export default LatestBlogPosts;
