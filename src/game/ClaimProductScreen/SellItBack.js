import React from 'react'
import { New } from 'croods'
import { withStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  icon: {
    height: theme.spacing.md,
  },
  quantity: {
    marginLeft: theme.spacing.xs,
    marginRight: theme.spacing.xs,
    width: theme.spacing.sm,
  },
  rightIcon: {
    alignItems: 'center',
    display: 'flex',
    height: theme.spacing.md,
    position: 'absolute',
    right: 0,
  },
})

export const createInnerComponent = ({ classes, amount }) => ({
  create,
  creating,
  error,
}) => (
  <React.Fragment>
    {error && (
      <Typography color="error" align="center" variant="h6">
        {error}
      </Typography>
    )}

    <Button
      aria-label="action-button"
      variant="contained"
      color="secondary"
      fullWidth
      onClick={() => {
        if (!creating) {
          create({ amount })
        }
      }}
    >
      {creating ? (
        <CircularProgress color="inherit" size={30} />
      ) : (
        <React.Fragment>
          <span>SELL IT BACK</span>
          <div className={classes.rightIcon}>
            <img
              src="/icons/diamond.png"
              alt="diamond"
              className={classes.icon}
            />
            <span className={classes.quantity}>3</span>
          </div>
        </React.Fragment>
      )}
    </Button>
  </React.Fragment>
)

export const afterCreate = ({ clearProduct }) => () => clearProduct()

export default withStyles(styles)(props => (
  <New
    name="tickets"
    path="/ticket_transactions"
    render={createInnerComponent(props)}
    afterCreate={afterCreate(props)}
  />
))
