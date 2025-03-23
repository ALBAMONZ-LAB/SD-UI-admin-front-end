import { style } from '@vanilla-extract/css';

export const eventFormSection = style({
  display: 'flex',
  flexDirection: 'column',
});

export const inputFormWrapper = style({
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: '12px',
});

export const selectBox = style({
  marginLeft: '6px',
  height: '36px',
  border: '1px solid #ccc',
  padding: '0 8px',
  borderRadius: '4px',
  marginBottom: '16px',
  flexShrink: 0,
});

export const deleteButton = style({
  flexShrink: 0,
  marginLeft: '8px',
  fontSize: '13px',
  color: '#858585',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  marginBottom: '24px',
});
