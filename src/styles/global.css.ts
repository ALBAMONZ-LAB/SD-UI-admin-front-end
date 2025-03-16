import { globalStyle } from '@vanilla-extract/css';

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  fontFamily: "'Arial', sans-serif",
  backgroundColor: '#f8f9fa',
  color: '#333',
  display: 'flex',
  flexDirection: 'column',
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
});

globalStyle('ul, ol', {
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

globalStyle('button', {
  all: 'unset',
  cursor: 'pointer',
});

globalStyle('input, textarea', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  border: '1px solid #ddd',
  padding: '8px',
  borderRadius: '4px',
});

globalStyle('.container', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});
