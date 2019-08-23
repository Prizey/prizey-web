import React from 'react'
import renderer from 'react-test-renderer'
import AdminText from '../AdminText'

jest.mock('croods', () => ({
  Info: ({ render, parseResponse, ...props }) => (
    <div {...props}>Info - {render()}</div>
  ),
}))

describe('when the component is mounted', () => {
  it('renders correctly', () => {
    const params = {
      render: () => <div>the result</div>,
      tags: 'homepage_cta',
    }

    const tree = renderer.create(<AdminText {...params} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('test the parse response', () => {
    const params = {
      render: () => <div>the result</div>,
      tags: 'homepage_cta',
    }
    const tree = renderer.create(<AdminText {...params} />).root
    const component = tree.findByProps({ name: 'adminText' })

    const data = [{ homepageCta: 'content' }]
    const response = component.props.parseResponse(data)

    expect(response).toEqual({
      info: {
        homepageCta: 'content',
        id: 'homepage_cta',
      },
    })
  })
})

describe('with more than one tag', () => {
  it('renders the path correctly', () => {
    const params = {
      render: () => <div>the result</div>,
      tags: ['homepage_cta', 'foobar_text'],
    }

    const tree = renderer.create(<AdminText {...params} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
