import { createMuiTheme } from '@material-ui/core/styles'

export const colors = {
  white: '#ffffff',
}

const theme = createMuiTheme({
  palette: {
    text: {
      primary: colors.white,
    },
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
    fontSize: 13,
    h2: {
      fontSize: '2.2rem',
      fontWeight: 'bold',
      letterSpacing: '0.52px',
    },
    useNextVariants: true,
  },
})

export default theme
