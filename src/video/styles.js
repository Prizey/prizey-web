export default {
  app: {
    overflow: 'hidden',
    textAlign: 'center',
  },
  player: {
    left: 0,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  progress: {
    backgroundColor: 'rgb(193, 233, 18)',
    height: '100%',
    transitionDuration: '3s',
    transitionProperty: 'width',
  },
  progressBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    bottom: '12%',
    height: '5px',
    left: '2.5%',
    position: 'absolute',
    width: '95%',
    zIndex: 2,
  },
  text: {
    color: 'white',
    position: 'absolute',
    textAlign: 'center',
    top: '13%',
    width: '100%',
    zIndex: 2,
  },
  wrapper: {
    height: '100vh',
    position: 'relative',
  },
}