"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";

const HeroBannerOne = ({
  banners,
  locale,
}: {
  banners: any[];
  locale: string;
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-screen-xl mx-auto py-15 px-4 md:px-8">
        <Carousel
          plugins={[
            Autoplay({
              delay: 10000,
            }),
          ]}
        >
          <CarouselContent className="space-x-2 ml-1">
            {banners.map((banner) => {
              const hasVideo = banner.Media_zone.some(
                (media: any) => media.__component === "common.video-banner"
              );

              return hasVideo ? (
                <CarouselItem
                  key={banner.id}
                  className="relative overflow-hidden rounded-xl flex flex-col-reverse md:flex-row items-center justify-evenly p-2"
                >
                  {banner.Media_zone.map((media: any) => {
                    if (media.__component === "common.video-banner") {
                      return (
                        <video
                          key={media.id}
                          src={
                            "http://localhost:1337" +
                            (isMobile
                              ? media.Mobile_video.Video.url
                              : media.Desktop_video.Video.url)
                          }
                          loop
                          muted
                          autoPlay
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      );
                    }
                  })}
                  <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="relative z-10 text-center bg-opacity-70 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
                  >
                    <h2 className="text-3xl md:text-5xl max-w-96 mx-auto font-bold">
                      {banner.Title}
                    </h2>
                    <p className="max-w-96 mx-auto leading-6">
                      {banner.Description}
                    </p>
                    <Link href={banner.Button.call_to_action}>
                      <Button className="text-xl p-3 md:p-8 rounded-full gap-2 md:gap-4">
                        <ArrowRight className="text-rose-500" />{" "}
                        {banner.Button.Title}
                      </Button>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ) : (
                <CarouselItem
                  key={banner.id}
                  className="relative rounded-xl flex flex-col-reverse md:flex-row items-center justify-evenly p-2"
                >
                  <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="text-center justify-center space-y-4"
                  >
                    <h2 className="text-3xl md:text-5xl max-w-96 mx-auto font-bold break-words">
                      {banner.Title}
                    </h2>
                    <p className="max-w-96 mx-auto leading-6">
                      {banner.Description}
                    </p>
                    <Link href={banner.Button.call_to_action} className="block">
                      <Button className="text-xl p-3 md:p-8 rounded-full gap-2 md:gap-4 mb-4">
                        <ArrowRight className="text-rose-500" />{" "}
                        {banner.Button.Title}
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative z-10"
                  >
                    {banner.Media_zone.map((media: any) => {
                      if (media.__component === "common.image-banner") {
                        return (
                          <Image
                            key={media.id}
                            className="bg-transparent rotate-6 relative z-50 object-contain"
                            src={
                              "http://localhost:1337" +
                              (isMobile
                                ? media.Mobile_image.Image.url
                                : media.Desktop_image.Image.url)
                            }
                            width={
                              isMobile
                                ? media.Mobile_image.Image.width
                                : media.Desktop_image.Image.width
                            }
                            height={
                              isMobile
                                ? media.Mobile_image.Image.height
                                : media.Desktop_image.Image.height
                            }
                            alt={media.Desktop_image.alt || "banner image"}
                          />
                        );
                      }
                    })}
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-5" />
          <CarouselNext className="right-5" />
        </Carousel>
      </div>
    </section>
  );
};

export default HeroBannerOne;
