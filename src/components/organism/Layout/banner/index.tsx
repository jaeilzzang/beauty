"use client";

import React from "react";

import { SwiperOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay } from "swiper/modules";

import Image from "next/image";

import styles from "./banner.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { ROUTE } from "@/router";
import { BannerOutputDto } from "@/apis/banner/banner.dto";

interface BannerProps {
  bannerItem: BannerOutputDto[];
}

export const Banner = ({ bannerItem }: BannerProps) => {
  const setting: SwiperOptions = {
    simulateTouch: true,
    grabCursor: true,
    centeredSlides: true,
    observer: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: true,
    modules: [Autoplay, Pagination],
  };

  return (
    <Swiper {...setting}>
      {/* todo map method */}
      {bannerItem.map(({ id, id_unique, imgurl, name }) => (
        <SwiperSlide key={id_unique}>
          <Link href={ROUTE.RECOMMEND_DETAIL + id}>
            <div className={styles.banner}>
              <Image
                fill
                src={imgurl}
                alt={name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
