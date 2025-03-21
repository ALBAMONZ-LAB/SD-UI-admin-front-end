import { style } from '@vanilla-extract/css';

export const inputGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '16px',
  width: '100%',
});

export const inputTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const toggleButton = style({
  backgroundColor: '#333333',
  color: '#fff',
  border: 'none',
  padding: '6px 8px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px',
  transition: 'background-color 0.3s ease',
  flexShrink: '0',
  ':hover': {
    backgroundColor: '#000', // Black background on hover
  },
});
