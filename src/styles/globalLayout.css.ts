import { style } from '@vanilla-extract/css';

export const layout = style({
  display: 'flex',
  width: '100vw',
  height: '100vh',
});

export const contents = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const main = style({
  flexGrow: 1,
  padding: '40px',
  overflowY: 'auto',
});

export const header = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: 'calc(100%-250px)',
  height: '60px',
  backgroundColor: '#f5f6f7',
  color: '#171717',
  padding: '0 20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});


export const userMenu = style({
  fontSize: '16px',
});
