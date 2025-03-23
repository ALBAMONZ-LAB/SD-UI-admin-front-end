'use client';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { wrapper, slideImage } from './Carousel.css';
import { ReactElement } from 'react';

interface CarouselProps {
  style?: React.CSSProperties;
  items: string[];
}

export const Carousel = ({ style, items, ...props }: CarouselProps) => {
  const hasEnoughSlides = items.length > 2;
  return (
    <div
      className={wrapper}
      style={{
        ...style,
      }}
    >
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        loop={hasEnoughSlides}
        spaceBetween={10}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        speed={1000}
      >
        {items.map((item, idx) => (
          <SwiperSlide key={'CAROUSEL_' + idx}>
            <img src={item} className={slideImage} alt={`carousel-${idx}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
