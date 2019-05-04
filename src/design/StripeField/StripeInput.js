import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {
    cursor: 'text',
    padding: '6px 0 7px',
    width: '100%',
  },
})

export default withStyles(styles, { withTheme: true })(
  ({ component: Component, classes, theme, onFocus, onBlur, onChange }) => (
    <Component
      className={classes.root}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      style={{
        base: {
          color: theme.palette.text.primary,
          fontFamily: theme.typography.fontFamily,
          fontSize: `${theme.typography.fontSize}px`,
        },
        invalid: {
          color: theme.palette.error.main,
        },
      }}
    />
  ),
)
