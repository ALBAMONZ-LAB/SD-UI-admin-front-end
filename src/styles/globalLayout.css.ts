import { style } from '@vanilla-extract/css';

export const layout = style({
  display: 'flex',
  width: '100vw',
  height: '100vh',
});

export const sidebar = style({
  width: '250px',
  height: '100%',
  backgroundColor: '#2c3e50',
  flexShrink: 0,
});

export const main = style({
  flexGrow: 1,
  padding: '40px',
  overflowY: 'auto',
});
