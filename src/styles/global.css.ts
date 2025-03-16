import { globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
  margin: 0,
  padding: 0,
  fontFamily: "'Arial', sans-serif",
  backgroundColor: '#ffffff',
  color: '#333',
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
});

globalStyle('li', {
  listStyle: 'none',
  padding: 0,
  margin: 0,
});
