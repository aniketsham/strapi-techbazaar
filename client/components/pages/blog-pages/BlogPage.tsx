"use client";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PopularPosts from "@/components/blog/PopularPosts";
import AboutMe from "@/components/blog/AboutMe";
import NewsLetterTwo from "@/components/newsLetter/NewsLetterTwo";
import CommentSection from "@/components/blog/CommentSection";
import axios from "axios";
import Link from "next/link";

const BlogTitlePage = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const [blog, setBlog] = useState<any>();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response: any = await axios.get(
          `http://localhost:1337/api/blogs?populate[Image][populate]=*&populate[Tags][populate]=*&filters[SLUG][$eq]=${slug}`
        );
        console.log(response.data.data[0]);
        setBlog(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getBlog();
  }, []);

  if (!blog) {
    return <h1>Loading..</h1>;
  }

  return (
    <>
      {blog && (
        <section>
          <div className="max-w-screen-xl mx-auto p-4 md:p-12">
            <div className="py-2">
              <BreadcrumbComponent
                pages={[
                  {
                    name: "Blog",
                    link: "/blog",
                  },
                ]}
                currentPage={blog.Title}
              />
            </div>
            {/* Blog details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
              <div className="space-y-4 lg:col-span-2">
                {/* Blog Title */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold capitalize">
                    {blog?.Title}
                  </h2>
                </div>
                <div className="relative w-full h-[30rem]">
                  <Image
                    src={"http://localhost:1337" + blog?.Image.Image.url}
                    alt={blog?.Image.alt}
                    fill
                    className="rounded-md object-contain"
                  />
                </div>
                {/* Video Section */}
                {blog?.VideoUrl && (
                  <div className="mt-4">
                    <iframe
                      width="100%"
                      height="400"
                      src={blog.VideoUrl}
                      title="Blog Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {/* Blog Body */}
                <div
                  className="prose dark:prose-invert max-w-none custom-blog-content"
                  dangerouslySetInnerHTML={{ __html: blog?.Body }}
                ></div>

                {/* Tags Section */}
                {blog?.Tags && blog.Tags.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {blog.Tags.map((tag: any) => (
                        <Link
                          key={tag.id}
                          href={`/tags/${tag.Tag}`}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200 transition"
                        >
                          #{tag.Tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="lg:col-span-1 space-y-4">
                <PopularPosts tags={blog.Tags} />
                <AboutMe />
              </div>
            </div>
          </div>
          <div>
            <CommentSection />
          </div>
          <div>
            <NewsLetterTwo />
          </div>
        </section>
      )}
    </>
  );
};

export default BlogTitlePage;
