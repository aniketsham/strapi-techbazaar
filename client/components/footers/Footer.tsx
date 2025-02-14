"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import { Loader } from "lucide-react";

const Footer = () => {
  const [footerData, setFooterData] = useState<any>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/footer?populate=*"
        );
        setFooterData(response.data.data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchFooterData();
  }, []);

  if (!footerData) return <Loader />; // Prevent rendering before data loads

  return (
    <footer className="bg-gray-700 text-white py-8 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto p-4 md:p-8 flex md:flex-row flex-wrap gap-4 md:gap-2 justify-between">
        {/* Brand & Social Links */}
        <div className="flex flex-col space-y-4 mb-8 md:mb-0">
          {/* Logo */}
          {footerData.Logo?.url && (
            <Image
              src={`http://localhost:1337${footerData.Logo.url}`}
              alt="Brand Logo"
              width={250}
              height={100}
            />
          )}
          <p>Your one-stop shop for all things electronics.</p>
          <div className="flex space-x-4">
            <Link href="https://www.facebook.com">
              <FaFacebook size={30} />
            </Link>
            <Link href="https://www.x.com">
              <FaTwitter size={30} />
            </Link>
            <Link href="https://www.instagram.com">
              <FaInstagramSquare size={30} />
            </Link>
          </div>
        </div>

        {/* Categories Section */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">Categories</h3>
          <ul className="space-y-2">
            {footerData.categories?.map((category: any) => (
              <li key={category.id}>
                <Link href={`/shop?category=${category.SLUG}`} className="">
                  {category.Name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">Navigation</h3>
          <ul className="space-y-2">
            {footerData.navigations?.map((nav: any) => (
              <li key={nav.id}>
                <Link href={nav.link} className="">
                  {nav.Title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Section */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">Support</h3>
          <ul className="space-y-2">
            {footerData.supports?.map((support: any) => (
              <li key={support.id}>
                <Link href={support.Link} className="">
                  {support.Title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider & Copyright */}
      <hr className="w-full h-[2px] bg-white" />
      <div className="text-center mt-8">
        <p>&copy; 2024 Your Brand Name. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
