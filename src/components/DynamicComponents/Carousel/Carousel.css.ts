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
});
