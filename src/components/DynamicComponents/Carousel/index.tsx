'use client';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// import styles from './Carousel.module.scss';
import { ReactElement } from 'react';

interface CarouselProps {
  backgroundColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  children: ReactElement<CarouselItemProps>[];
}

interface CarouselItemProps {
  imageUrl: string;
  width: string;
  height: string;
}

export const Carousel = ({ ...props }: CarouselProps) => (
  <div
    style={{
      backgroundColor: props.backgroundColor,
      paddingTop: props.paddingTop,
      paddingBottom: props.paddingBottom,
      paddingLeft: props.paddingLeft,
      paddingRight: props.paddingRight,
    }}
  >
    <Swiper
      slidesPerView={2}
      centeredSlides={true}
      loop={true}
      spaceBetween={4}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        modifier: 0,
        slideShadows: false,
      }}
      modules={[Autoplay]}
      className={styles.swiper}
      speed={1000}
    >
      {props.children.map((item, idx) => (
        <SwiperSlide key={'CAROUSEL_' + idx}>
          <img
            src={item.props.imageUrl}
            style={{
              width: item.props.width,
              height: item.props.height,
              borderRadius: 10,
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);
