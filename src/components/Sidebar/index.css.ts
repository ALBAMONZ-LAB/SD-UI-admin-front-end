import { style } from '@vanilla-extract/css';

export const sidebar = style({
  width: '250px',
  height: '100vh',
  backgroundColor: '#2c3e50',
  color: '#ecf0f1',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '@media': {
    '(max-width: 768px)': {
      transform: 'translateX(-100%)',
    },
  },
});

export const sidebarOpen = style({
  transform: 'translateX(0) !important',
});

export const sidebarHeader = style({
  padding: '20px',
  backgroundColor: '#1a252f',
  textAlign: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
});

export const navList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const navItem = style({
  borderBottom: '1px solid #34495e',
});

export const navLink = style({
  display: 'block',
  padding: '15px 20px',
  color: '#ecf0f1',
  textDecoration: 'none',
  transition: 'background 0.2s',
  ':hover': {
    backgroundColor: '#34495e',
  },
});

export const toggleButton = style({
  position: 'absolute',
  top: '15px',
  left: '260px',
  background: 'none',
  border: 'none',
  fontSize: '20px',
  color: '#ecf0f1',
  cursor: 'pointer',
  '@media': {
    '(min-width: 769px)': {
      display: 'none',
    },
  },
});
