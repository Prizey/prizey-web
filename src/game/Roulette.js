import React, { useState, useLayoutEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import posed from 'react-pose'

export const getItemSpeed = (price, speed, multiplier) => {
  const PRICE_FACTOR = process.env.REACT_APP_PRICE_FACTOR || 1
  const deltaSpeed = (PRICE_FACTOR / price) * multiplier * speed
  return Math.max(deltaSpeed, 80)
}

const styles = () => ({
  img: {
    maxWidth: '300px',
    position: 'absolute',
    width: '100%',
  },
  root: {
    height: '300px',
    maxWidth: '300px',
    position: 'relative',
    width: '100%',
  },
})

export const enterTransition = ({ speed }) => ({
  opacity: {
    duration: Math.min(speed - 50, 500),
    loop: 100,
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

export default withStyles(styles)(({ classes, speed, onSelectItem, data }) => {
  const [next, setNext] = useState(0)
  const multiplier = 2

  useLayoutEffect(() => {
    const item = data[next]
    const timeout = setTimeout(() => {
      setNext((next + 1) % data.length)
    }, getItemSpeed(item.price, speed, multiplier))

    return () => clearTimeout(timeout)
  }, [speed, data, next, setNext])

  return (
    <div className={classes.root}>
      {data.map((item, id) => (
        <div
          key={`${item.id}-${id}`}
          testID={`rouletteItem-${id}`}
          onMouseDown={() => onSelectItem(item)}
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
})
