import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color
    },
    secondary: {
      main: '#dc004e', // Secondary color
    },
    background: {
      default: '#f5f5f5', // Background color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Global font
    h1: {
      fontSize: '2.5rem', // Example of heading customization
    },
  },
});

export default Theme;