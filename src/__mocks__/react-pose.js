import React from 'react'

const mockPoseComponent = name => () => props => {
  const { children, ...otherProps } = props
  return React.createElement(name, otherProps, children)
}

const mock = jest.genMockFromModule('react-pose')

mock.default.img = mockPoseComponent('img')
mock.default.div = mockPoseComponent('div')

module.exports = mock
