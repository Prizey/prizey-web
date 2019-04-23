import { createMuiTheme } from '@material-ui/core/styles'

export const colors = {
  white: '#ffffff',
}

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      label: {
        fontSize: '14px',
      },
      root: {
        height: '44px',
        marginTop: '20px',
      },
    },
    MuiSvgIcon: {
      root: {
        color: '#ffffff',
      },
    },
  },
  palette: {
    difficulty: {
      easy: '#76ff03',
      hard: '#ff1744',
      medium: '#ffff00',
    },
    error: {
      main: '#40c4ff',
    },
    primary: {
      main: '#ffff00',
    },
    secondary: {
      main: '#76ff03',
    },
    text: {
      primary: colors.white,
    },
  },
  shape: {
    borderRadius: 10,
  },
  spacing: {
    lg: '80px',
    md: '30px',
    sm: '20px',
    xs: '10px',
  },
  typography: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue","Lucida Grande", "Segoe UI"',
    fontSize: 14,
    h2: {
      fontSize: '2.2rem',
      fontWeight: 'bold',
      letterSpacing: '0.52px',
    },
    h5: {
      fontSize: '1.5rem',
    },
    subtitle1: {
      letterSpacing: '0.25px',
    },
    useNextVariants: true,
  },
})

export default theme
