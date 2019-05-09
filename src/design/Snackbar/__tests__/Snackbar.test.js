import React from 'react'
import renderer from 'react-test-renderer'

import Snackbar from '../Snackbar'

it('renders correctly', () => {
  const tree = renderer.create(<Snackbar />).toJSON()
  expect(tree).toMatchSnapshot()
})
