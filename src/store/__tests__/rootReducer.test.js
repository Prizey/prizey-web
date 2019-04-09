import rootReducer from '../rootReducer'

jest.mock('redux', () => ({ combineReducers: reducers => reducers }))
jest.mock('croods', () => ({ createReducer: name => name }))

it('combines reducers', () => {
  expect(rootReducer).toEqual({})
})
