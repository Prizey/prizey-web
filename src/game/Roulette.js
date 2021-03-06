import React, { useState, useLayoutEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import posed from 'react-pose'

export const getItemSpeed = (price, speed, multiplier) => {
  const PRICE_FACTOR = process.env.REACT_APP_PRICE_FACTOR || 1
  const deltaSpeed =
    multiplier > 0
      ? (PRICE_FACTOR / parseFloat(price)) * multiplier * speed
      : speed
  return Math.min(Math.max(deltaSpeed, 80), 2000)
}

const styles = theme => ({
  img: {
    maxWidth: '300px',
    position: 'absolute',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '250px',
    },
  },
  root: {
    height: '300px',
    margin: 'auto',
    maxWidth: '300px',
    position: 'relative',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      height: '250px',
      maxWidth: '250px',
    },
  },
})

export const enterTransition = ({ speed }) => ({
  opacity: {
    duration: Math.min(speed - 50, 500),
  },
  x: { duration: 10 },
})

const PosedImg = posed.img({
  enter: {
    opacity: 1,
    transition: enterTransition,
    x: 0,
  },
  leave: {
    opacity: 0,
    transition: {
      opacity: { duration: 10, ease: 'easeOut' },
      x: { duration: 10 },
    },
    x: -9999,
  },
})

export default withStyles(styles)(
  ({ classes, speed, onSelectItem, data, multiplier = 1 }) => {
    const [next, setNext] = useState(0)

    useLayoutEffect(() => {
      const item = data[next]
      const timeout = setTimeout(() => {
        setNext((next + 1) % data.length)
      }, getItemSpeed(item.price, speed, multiplier))

      return () => clearTimeout(timeout)
    }, [speed, data, next, setNext, multiplier])

    return (
      <div className={classes.root}>
        {data.map((item, id) => (
          <div
            key={`${item.id}-${id}`}
            aria-label={`rouletteItem-${id}`}
            onMouseDown={() => onSelectItem && onSelectItem(item)}
          >
            <PosedImg
              pose={next === id ? 'enter' : 'leave'}
              src={item.image}
              alt={item.title}
              className={classes.img}
              speed={getItemSpeed(item.price, speed, multiplier)}
            />
          </div>
        ))}
      </div>
    )
  },
)
