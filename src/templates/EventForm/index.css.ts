import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  gap: '20px',
});

export const infoSection = style({
  padding: '20px',
  backgroundColor: '#f4f6f8',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
});
export const eventInfoGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '12px',
  border: 'none',
  marginBottom: '16px',
});

export const eventInfoField = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: '14px',
  gap: '10px',
});

export const contentsSection = style({
  display: 'flex',
  gap: '20px',
});

export const contentsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '20px',
  backgroundColor: '#f4f6f8',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

export const sectionTitle = style({
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '8px',
});

export const addSectionField = style({
  display: 'flex',
  gap: '8px',
});

export const addSectionButton = style({
  padding: '0 12px',
  height: ' 37px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});

export const addSelect = style({
  padding: '10px',
  height: '37px',
  borderRadius: '4px',
  border: '1px solid #ccc',
});

export const saveButtonContainer = style({
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'center',
});
