'use client';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { slideImage } from './Carousel.css';

export interface CarouselProps {
  items: string[];
}

export const Carousel = ({ items }: CarouselProps) => {
  const hasEnoughSlides = items.length > 2;
  return (
    <Swiper
      slidesPerView={1.2}
      // centeredSlides={true}
      loop={hasEnoughSlides}
      spaceBetween={10}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      speed={1500}
    >
      {items.map((item, idx) => (
        <SwiperSlide key={'CAROUSEL_' + idx}>
          <img src={item} className={slideImage} alt={`carousel-${idx}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
