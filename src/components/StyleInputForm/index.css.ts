import { style } from '@vanilla-extract/css';

export const styleGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  backgroundColor: '#e0e3e6', // Darker background color
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom:'24px',
  marginTop:'-12px'
});

export const styleInput = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '8px'
});


export const subLabel = style({
  fontSize: '12px',
  color: '#666',
});


