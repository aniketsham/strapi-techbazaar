"use client";
import React, { Suspense, useEffect, useState } from "react";
import Logo from "../logo/Logo";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "./SearchBox";
import Cart from "../carts/Cart";
import { ThemeToggle } from "../theme/ThemeToggle";
import AccountPopover from "../account/AccountPopover";
import { Search } from "lucide-react";
import MobileHeader from "./MobileHeader";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useMobileSearchModal } from "@/store/mobileSearchStore";
import Loader from "../others/Loader";
import DropdownMenuComponent from "../others/DropdownMenu";

const HeaderOne = () => {
  const pathname = usePathname();
  const [headerData, setHeaderData] = useState<any>();

  useEffect(() => {
    const getHeaderData = async () => {
      try {
        const response: any = await axios.get(
          "http://localhost:1337/api/header?populate=*"
        );
        setHeaderData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getHeaderData();
  }, []);

  const { openModal } = useMobileSearchModal();

  if (!headerData) {
    return <Loader />;
  }

  return (
    <header className="sticky bg-white dark:bg-slate-950 top-0 z-50 w-full">
      <div className="max-w-screen-xl mx-auto p-4 md:py-4 md:px-8 flex items-center justify-between gap-2">
        {/* <Logo img={"http://localhost:1337" + headerData.Logo.url} /> */}
        <Link href="/" className="block">
          <Image
            src={"http://localhost:1337" + headerData.Logo.url}
            width={250}
            height={50}
            className="max-w-[250px] "
            alt="brand"
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-3 xl:gap-6 text-lg">
          {headerData.navigations.map((navItem: any) => {
            const isActive = pathname === navItem.link; // Check if current route matches

            return (
              <Link
                key={navItem.id}
                className={cn(
                  "font-medium text-sm px-4 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 whitespace-nowrap",
                  isActive && "bg-gray-200 dark:bg-gray-800 rounded-full"
                )}
                href={navItem.link}
              >
                {navItem.Title}
              </Link>
            );
          })}
        </ul>
        <div className="flex items-center gap-6">
          {/* Mobile search */}
          <div className="lg:hidden text-center">
            <Search size={25} onClick={openModal} />
          </div>
          {/* Desktop search */}
          <div className="hidden lg:block">
            <Suspense fallback={<p>Loading...</p>}>
              <SearchBox />
            </Suspense>
          </div>
          <div className="flex items-center gap-6 lg:gap-2 lg:-mt-1">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            <MobileHeader />
          </div>
        </div>
      </div>
      <Separator />
    </header>
  );
};

export default HeaderOne;
