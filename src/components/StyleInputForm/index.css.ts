import { style } from '@vanilla-extract/css';

export const styleGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '1rem',
  backgroundColor: '#e0e3e6', // Darker background color
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

export const styleInput = style({
  display: 'flex',
  flexDirection: 'column',

});
