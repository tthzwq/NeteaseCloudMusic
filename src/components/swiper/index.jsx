import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import "./index.less";

export default function SwiperComponent({ banners }) {
  function handleSwiper(swiper) {
    console.log(swiper.pagination.bullets);
    for (let i = 0; i < swiper.pagination.bullets.length; i++) {
      swiper.pagination.bullets[i].onmouseover = function () {
        this.click();
      };
    }
  }

  return (
    <Swiper
      className="swiper-banner h-[198px]"
      effect={"coverflow"}
      loop={true}
      slidesPerView={1.01}
      spaceBetween={-500}
      centeredSlides={true}
      speed={500}
      coverflowEffect={{
        depth: 1, // 深度偏移
        modifier: 1, // 效果乘数
        rotate: 0, // 旋转角度
        scale: 0.5, // 缩放比例
        slideShadows: false, // 开启阴影
        stretch: "38%", // 拉伸
      }}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
      onSwiper={handleSwiper}
    >
      {banners.map((banner, index) => {
        return (
          <SwiperSlide className="h-[198px]" key={index}>
            <img
              className="swiper-banner-img mx-[auto] rounded-lg h-[198px]"
              src={banner}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
