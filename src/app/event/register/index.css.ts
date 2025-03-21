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

export const addSection = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '20px',
});

export const addSectionField = style({
  display: 'flex',
  gap: '8px',
});

export const addSectionButton = style({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});

export const addSectionSelect = style({
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
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
