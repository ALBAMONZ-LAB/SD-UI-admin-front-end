import { style } from '@vanilla-extract/css';

export const inputGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap:'10px',
  marginBottom: '16px',
});

export const input = style({
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '1rem',
});
