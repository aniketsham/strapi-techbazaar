"use client";
import React, { useState } from "react";
import { InstantSearch, Hits, useSearchBox } from "react-instantsearch";
import { Highlight } from "react-instantsearch";
import { algoliasearch } from "algoliasearch";
import { Search as SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateRecentProducts } from "@/lib/getRecentProducts";

const searchClient = algoliasearch(
  "KVQJPMI9HT",
  "9a6e7846ab9b1f4b75116102f1e3b2a3"
);

const SearchBoxCustom = ({
  setIsOpen,
}: {
  setIsOpen: (open: boolean) => void;
}) => {
  const { query, refine } = useSearchBox();

  return (
    <div className="flex items-center gap-2 border rounded-lg px-3 py-2 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-600 w-full">
      {/* Search Icon */}
      <SearchIcon className="text-gray-500 dark:text-gray-300" size={20} />

      {/* Input Field */}
      <input
        type="text"
        value={query}
        onChange={(e) => refine(e.target.value)}
        placeholder="Search products..."
        className="p-2 w-full border-none outline-none focus:ring-0 bg-transparent dark:text-white"
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />

      {/* Clear Button (X) */}
      {query && (
        <button onClick={() => refine("")}>
          <X
            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400"
            size={18}
          />
        </button>
      )}
    </div>
  );
};

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleProductClick = (product: any) => {
    console.log("User clicked on product:", product);
    updateRecentProducts(product);
    // Perform any other action here (e.g., analytics, API call, etc.)
    router.push(`/product/${product.SLUG}`);
  };
  return (
    <div className="relative w-full lg:w-96">
      <InstantSearch
        indexName="development_api::product.product"
        searchClient={searchClient}
      >
        {/* Custom Search Box */}
        <SearchBoxCustom setIsOpen={setIsOpen} />

        {/* Autocomplete Dropdown */}
        {isOpen && (
          <div className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-lg p-2 z-50">
            <Hits
              hitComponent={({ hit }) => {
                return (
                  <div
                    className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                    onClick={() => handleProductClick(hit)}
                  >
                    {/* Product Image */}
                    {hit.Product_image?.[0]?.Image?.url && (
                      <img
                        src={
                          "http://localhost:1337" +
                          hit.Product_image[0].Image.url
                        }
                        alt={hit.Title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    )}

                    {/* Product Details */}
                    <div className="flex flex-col">
                      {/* Highlighted Product Title */}
                      <span className="font-medium text-gray-900 dark:text-white">
                        <Highlight attribute="Title" hit={hit} />
                      </span>

                      {/* Category */}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {hit.sub_category?.category?.Name || "Uncategorized"}
                      </span>

                      {/* Price */}
                      <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        ${hit.Price}
                      </span>
                    </div>
                  </div>
                );
              }}
              classNames={{
                list: "flex flex-col gap-2",
                item: "p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer",
              }}
            />
          </div>
        )}
      </InstantSearch>
    </div>
  );
};

export default Search;
