import React from 'react'
import { List as CroodsList } from 'croods'
import { Link } from '@reach/router'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'

import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListSubheader from '@material-ui/core/ListSubheader'
import CircularProgress from '@material-ui/core/CircularProgress'

import Layout from 'design/Layout/Layout'
import UserBalance from 'design/UserBalance'
import ProfileLink from 'design/ProfileLink/ProfileLink'

const difficulties = [
  { label: 'EASY', name: 'easy' },
  { label: 'MEDIUM', name: 'medium' },
  { label: 'HARD', name: 'hard' },
]

const styles = theme => ({
  listItem: {
    background: 'rgba(0, 0, 0, 0.087)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.087)',
  },
  login: {
    align: 'left',
    marginRight: '20px',
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
  root: {
    borderRadius: 6,
    height: '65vh',
    overflow: 'auto',
  },
  sectionList: {
    margin: 0,
    padding: 0,
  },
  subheader: {
    fontWeight: 'bold',
    marginTop: theme.spacing.xs,
  },
})

const AllPrizesScreen = withStyles(styles)(
  ({ classes, location, currentUser }) => (
    <Layout
      leftIcon={<UserBalance />}
      rightIcon={
        currentUser ? (
          <ProfileLink />
        ) : (
          <Link to={'/sign-in?next=/game'} style={{ textDecoration: 'none' }}>
            <Typography className={classes.login}>Login</Typography>
          </Link>
        )
      }
      location={location}
      currentUser={currentUser}
    >
      <List subheader={<li />} className={classes.root}>
        {difficulties.map(difficulty => (
          <li key={`section-${difficulty.name}`}>
            <ul className={classes.sectionList}>
              <ListSubheader className={classes.subheader} disableSticky>
                {difficulty.label}
              </ListSubheader>
              <CroodsList
                parentId={difficulty.name}
                name="products"
                path={`/products/${difficulty.name}`}
                renderLoading={() => (
                  <CircularProgress
                    color="inherit"
                    size={30}
                    className={classes.loading}
                  />
                )}
                render={products =>
                  products.map(item => (
                    <ListItem
                      key={`item-${difficulty.name}-${item.id}`}
                      className={classes.listItem}
                    >
                      <ListItemAvatar>
                        <Avatar src={item.image} alt={item.title} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={`MSRP: $${parseFloat(item.price).toFixed(
                          2,
                        )}`}
                      />
                    </ListItem>
                  ))
                }
              />
            </ul>
          </li>
        ))}
      </List>
    </Layout>
  ),
)

export default AllPrizesScreen
