import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import App from './App';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Example primary color
    },
    secondary: {
      main: '#dc004e', // Example secondary color
    },
  },
  // Add other theme customizations if necessary
});

// Get the root element
const rootElement = document.getElementById('root');

// Create a root using the new API
const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);