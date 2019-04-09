import ReactDOM from 'react-dom'

jest.mock('react-dom', () => ({
  render: jest.fn(),
}))

it('renders App', () => {
  require('../index')
  expect(ReactDOM.render).toHaveBeenCalled()
})
