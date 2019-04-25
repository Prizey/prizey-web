import React from 'react'
import renderer from 'react-test-renderer'

import { InputField as Field } from '../Field'

it('renders correctly the desktop field', () => {
  const tree = renderer
    .create(<Field label="foo" meta={{}} input={{ name: 'foo' }} width="md" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly the desktop field with error', () => {
  const tree = renderer
    .create(
      <Field
        label="foo"
        meta={{ error: 'bar', touched: true }}
        input={{ name: 'foo' }}
        width="md"
      />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly the mobile field', () => {
  const tree = renderer
    .create(<Field label="foo" meta={{}} input={{ name: 'foo' }} width="xs" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly the mobile field with error', () => {
  const tree = renderer
    .create(
      <Field
        label="foo"
        meta={{ error: 'bar', touched: true }}
        input={{ name: 'foo' }}
        width="xs"
      />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
