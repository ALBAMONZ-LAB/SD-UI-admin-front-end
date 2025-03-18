import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  padding: '20px',
  gap: '20px',
});

export const section = style({
  flex: 1,
  padding: '20px',
  backgroundColor: '#f4f6f8',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

export const inputGroup = style({
  marginBottom: '15px',
});

export const readOnlyFields = style({
  marginBottom: '20px',
  fontSize: '14px',
  color: '#777',
});

export const sectionContainer = style({
  marginBottom: '15px',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: '#fff',
});

export const saveButtonContainer = style({
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'center',
});

export const previewHeader = style({
  fontWeight: 'bold',
  marginBottom: '10px',
});
