import React from 'react'
import { Info } from 'croods'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Layout from 'design/Layout/Layout'
import GoBack from 'design/GoBack/GoBack'

const styles = theme => ({
  root: {
    height: '65vh',
    marginBottom: theme.spacing.md,
    marginTop: parseInt(theme.spacing.md, 10) * -1,
    overflow: 'auto',
  },
})

const FairnessText = props => (
  <Info
    id="1"
    name="game"
    path="/game_setting"
    render={info => <FairnessTextContent info={info} {...props} />}
  />
)

const FairnessTextContent = withStyles(styles)(
  ({ classes, info, location }) => (
    <Layout location={location} leftIcon={<GoBack to="/" />}>
      <Typography align="left" variant="body1" className={classes.root}>
        <div
          dangerouslySetInnerHTML={{
            __html: info.fairnessText,
          }}
        />
      </Typography>
    </Layout>
  ),
)

export default FairnessText