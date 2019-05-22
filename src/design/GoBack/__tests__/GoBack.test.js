import { handleClick } from '../GoBack'

window.history.back = jest.fn()

describe('when the component is clicked', () => {
  it('go to back screen if doesnt have a link', () => {
    const to = ''
    handleClick(to)({ preventDefault: jest.fn() })
    expect(window.history.back).toHaveBeenCalled()
  })
})
