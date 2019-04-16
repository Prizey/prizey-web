import React from 'react'
import renderer from 'react-test-renderer'
import ChooseDifficulty from '../ChooseDifficulty'

it('renders correctly', () => {
  const tree = renderer.create(<ChooseDifficulty />).toJSON()
  expect(tree).toMatchSnapshot()
})
