import { style } from '@vanilla-extract/css';

export const inputGroup = style({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
});

export const label = style({
  marginBottom: '0.5rem',
  fontWeight: 'bold',
});

export const input = style({
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '1rem',
});