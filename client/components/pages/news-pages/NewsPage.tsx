"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "react-instantsearch";
import BreadcrumbComponent from "@/components/others/Breadcrumb";

const NewsPage = () => {
  const [news, setNews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const totalPages = 3; // Set dynamically based on API response

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/news-lists?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:desc`
        );
        setNews(response.data.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, [page]);

  return (
    <section className="max-w-screen-xl mx-auto p-6">
      <div>
        <BreadcrumbComponent currentPage="News" />
      </div>
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Latest News
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <div
            key={article.id}
            className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <Link href={article.News_url} target="_blank">
              <div className="relative w-full h-60">
                <Image
                  src={"http://localhost:1337" + article.News_image.url}
                  alt={article.News_title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {article.News_title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {new Date(article.News_date).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md">
          Page {page}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default NewsPage;
