import store from '../store'
import createStore from '../createStore'
import rootReducer from '../rootReducer'

jest.mock('../createStore', () => reducer => reducer)
jest.mock('../rootReducer', () => () => ({ foo: 'bar' }))

it('creates the correct store', () => {
  expect(store).toEqual(createStore(rootReducer))
})
