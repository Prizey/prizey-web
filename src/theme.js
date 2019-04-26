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
    MuiInput: {
      formControl: {
        'label + &': {
          marginTop: 0,
        },
      },
      root: {
        '@media (max-width: 425px)': {
          marginBottom: '15px',
          padding: '10px 16px 7px',
        },
        background: 'rgba(0, 0, 0, 0.087)',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        padding: '20px 16px 7px',
      },
      underline: {
        '&:before': {
          borderBottom: '2px solid #ffffff',
        },
      },
    },
    MuiInputLabel: {
      formControl: {
        '&$focused': {
          transform: 'none',
        },
        color: '#ffffff',
        fontSize: '12px',
        left: '16px',
        position: 'relative',
        top: '22px',
        transform: 'none',
      },
      shrink: {
        transform: 'none',
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
      dark: '#ffff00',
      main: '#ffff00',
    },
    secondary: {
      main: '#76ff03',
    },
    text: {
      primary: colors.white,
    },
    type: 'light',
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
    fontFamily: 'Roboto, "Helvetica Neue","Lucida Grande", "Segoe UI"',
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
