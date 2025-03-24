import { style } from '@vanilla-extract/css';

export const header = style({
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '16px',
})

export const styleGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
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
  justifyContent: 'space-between',
  gap: '8px'
});


export const subLabel = style({
  fontSize: '12px',
  color: '#666',
});


