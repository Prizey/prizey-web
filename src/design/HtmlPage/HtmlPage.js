import React from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Layout from 'design/Layout/Layout'
import GoBack from 'design/GoBack/GoBack'
import AdminText from 'design/AdminText/AdminText'

const styles = theme => ({
  root: {
    height: '65vh',
    marginBottom: theme.spacing.md,
    marginTop: parseInt(theme.spacing.md, 10) * -1,
    overflow: 'auto',
  },
})

const HtmlPage = props => (
  <AdminText
    tags={props.tags}
    render={info => <HtmlPageContent info={info} {...props} />}
  />
)

const HtmlPageContent = withStyles(styles)(
  ({ classes, info, location, contentKey }) => (
    <Layout location={location} leftIcon={<GoBack />}>
      <Typography align="left" variant="body1" className={classes.root}>
        <div
          dangerouslySetInnerHTML={{
            __html: info[0][contentKey],
          }}
        />
      </Typography>
    </Layout>
  ),
)

export default HtmlPage
