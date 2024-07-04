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

export const Banner = () => {
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
      <SwiperSlide>
        <div className={styles.banner}>
          <Image fill src={"/banner/banner1.jpeg"} alt="banner1" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.banner}>
          <Image fill src={"/banner/banner2.jpeg"} alt="banner2" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.banner}>
          <Image fill src={"/banner/banner3.jpeg"} alt="banner3" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
