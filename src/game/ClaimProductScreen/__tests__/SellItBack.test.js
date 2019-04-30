import React from 'react'
import ReactDOM from 'react-dom'
import renderer, { act } from 'react-test-renderer'
import SellItBack, { afterCreate } from '../SellItBack'

jest.mock('croods', () => ({
  New: props => (
    <div {...props}>
      New - <div>render - {props.render(props)}</div>
    </div>
  ),
}))

describe('', () => {
  beforeAll(() => {
    ReactDOM.createPortal = element => <div>{element}</div>
  })

  it('renders correctly', () => {
    act(() => {
      const tree = renderer
        .create(<SellItBack amount={3} clearProduct={jest.fn} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  it('call the clear on after create', () => {
    const navigate = jest.fn()
    afterCreate({ navigate })()

    expect(navigate).toHaveBeenCalledTimes(1)
  })

  // it('call the create when click on button', () => {
  //   const params = {
  //     amount: 3,
  //     classes: {},
  //     create: jest.fn(),
  //     creating: false,
  //     error: null,
  //   }

  //     const tree = renderer.create(<SellItBackComponent {...params} />).root

  //     console.log(renderer.create(<SellItBackComponent {...params} />))
  //     tree.findByProps({ 'aria-label': 'action-button' }).props.onClick()

  //     expect(params.create).toHaveBeenCalledTimes(1)
  //   })
})
