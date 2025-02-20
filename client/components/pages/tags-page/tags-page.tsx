"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BreadcrumbComponent from "@/components/others/Breadcrumb";

const TagsPage = ({ slug }: any) => {
  const [blogData, setBlogData] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/blogs?populate[Image][populate]=*&filters[Tags][Tag][$eq]=${slug}`
        );
        setBlogData(response.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    if (slug) fetchBlogs();
  }, [slug]);

  if (!blogData.length) return <h1 className="text-center">No blogs found</h1>;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogData.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <div className="py-2">
        <BreadcrumbComponent pages={[{name:"blogs",link:"/blog"}]} currentPage={`${slug}`} />
      </div>
      <h2 className="text-3xl font-semibold text-center mb-8">
        Posts tagged: {slug}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
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
              <h3 className="text-xl font-semibold mb-2">{post.Title}</h3>
              <p className="text-sm mb-2">
                {new Date(post.createdAt).toDateString()}
              </p>
              <p className="text-gray-700 dark:text-gray-400">{post.Summary}</p>
              <div className="mt-4">
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
      <div className="flex justify-center mt-8">
        {Array.from(
          { length: Math.ceil(blogData.length / postsPerPage) },
          (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default TagsPage;
