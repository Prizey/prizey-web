import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import useInterval from '@use-it/interval'
import posed from 'react-pose'

const styles = () => ({
  img: {
    height: '300px',
    position: 'absolute',
    width: '300px',
  },
  root: {
    height: '300px',
    width: '300px',
  },
})

const PosedImg = posed.img({
  enter: {
    opacity: 1,
    transition: {
      x: { duration: 1 },
    },
    x: 0,
  },
  leave: {
    opacity: 0,
    transition: {
      x: { duration: 1 },
    },
    x: -9999,
  },
})

export default withStyles(styles)(({ classes, speed, onSelectItem, data }) => {
  const [next, setNext] = useState(0)

  useInterval(() => {
    setNext((next + 1) % data.length)
  }, speed)

  return (
    <div className={classes.root}>
      {data.map((item, id) => (
        <PosedImg
          key={`${item.id}-${id}`}
          onClick={() => onSelectItem(item)}
          pose={next === id ? 'enter' : 'leave'}
          src={item.image}
          alt={item.title}
          className={classes.img}
        />
      ))}
    </div>
  )
})
