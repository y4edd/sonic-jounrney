"use client";

import Image from "next/image";
import "swiper/css";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

// スライダーに表示させる画像パス、今後リンクにする必要があります
const sliderImages = [
  "/images/sliderImage1.png",
  "/images/sliderImage2.png",
  "/images/sliderImage3.png",
  "/images/sliderImage4.png",
];

const Slider = () => {
  return (
    <div>
      <Swiper
        slidesPerView={2}
        spaceBetween={15}
        centeredSlides={true}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Keyboard, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderImages.map((image) => {
          return (
            <SwiperSlide key={image}>
              <Image src={image} alt="スライダー画像" width={150} height={100} priority />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
