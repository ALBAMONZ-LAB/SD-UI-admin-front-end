// Carousel.css.ts
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100%',
  overflow: 'hidden',
  padding: '10px',
  borderRadius: '10px',
  backgroundColor: '#fff',
});

export const slideImage = style({
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
  display: 'block',
  selectors: {
    "&.swiper-slide-shadow-coverflow": {
      backgroundImage: "none !important",
    },
  },
});

export const swiperSlide = style({
  selectors: {
    '&.swiper-slide-prev, &.swiper-slide-next': {
      opacity: 0.7,
      transform: 'scale(0.95)',
      zIndex: 1,
      borderRadius: '10px',
    },
    '&.swiper-slide-active': {
      opacity: 1,
      transform: 'scale(1)',
      zIndex: 1,
    },
  },
});
