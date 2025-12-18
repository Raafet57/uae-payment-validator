import { createTheme } from '@mui/material/styles';

// UAE National Colors Theme
const uaeTheme = createTheme({
  palette: {
    primary: {
      main: '#006C35', // UAE Green
      light: '#338A5D',
      dark: '#004D25',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C8A415', // UAE Gold
      light: '#D4B844',
      dark: '#9A7E10',
      contrastText: '#000000',
    },
    error: {
      main: '#CE1126', // UAE Red
      light: '#D84151',
      dark: '#A00D1E',
    },
    warning: {
      main: '#F59E0B',
      light: '#FFC107',
      dark: '#D97706',
    },
    success: {
      main: '#006C35',
      light: '#338A5D',
      dark: '#004D25',
    },
    info: {
      main: '#0284C7',
      light: '#38BDF8',
      dark: '#0369A1',
    },
    background: {
      default: '#FAF9F7', // Light sand
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#6B7280',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 20px',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 108, 53, 0.2)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 108, 53, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 108, 53, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            fontWeight: 600,
            backgroundColor: '#F3F4F6',
          },
        },
      },
    },
  },
});

export default uaeTheme;
