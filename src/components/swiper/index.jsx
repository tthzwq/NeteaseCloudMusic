import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import "./index.less";
import { memo } from "react";

const SwiperComponent = memo(({ banners }) => {

  function handleSwiper(swiper) {
    for (let i = 0; i < swiper.pagination.bullets.length; i++) {
      swiper.pagination.bullets[i].onmouseover = function () {
        this.click();
      };
    }
  }

  function handleUpdate(swiper) {
    swiper.autoplay.start();
  }

  return (
    <Swiper
      className="swiper-banner h-[200px]"
      effect={"coverflow"}
      loop={true}
      slidesPerView={1.01}
      spaceBetween={-530}
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
      onUpdate={handleUpdate}
    >
      {banners.map((item, index) => {
        return (
          <SwiperSlide className="h-[200px]" key={item.encodeId}>
            <img
              className="swiper-banner-img mx-[auto] rounded-lg h-[200px]"
              src={item.imageUrl}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
});

export default SwiperComponent;
