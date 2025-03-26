'use client';

import { PageJsonContentsItem } from '@sd-ui-admin/types';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { slideImage } from './Carousel.css';

export interface CarouselProps {
  contents: Partial<PageJsonContentsItem>;
  items: string[];
  sectionStyle?: React.CSSProperties;
}

export const Carousel = ({ contents, items, sectionStyle, ...props }: CarouselProps) => {
  const hasEnoughSlides = items.length > 2;
  return (
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
  );
};
