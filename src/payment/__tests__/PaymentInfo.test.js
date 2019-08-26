import React from 'react'
import renderer from 'react-test-renderer'
import PaymentInfo, { afterPurchase } from '../PaymentInfo'
import {
  handleSubmit,
  CreditCardFields,
  handleSelectCard,
} from '../CreditCardForm'

const mockList = [
  { id: 1, price: '10.0', ticketAmount: 10 },
  { id: 2, price: '25.0', ticketAmount: 25 },
  { id: 3, price: '50.0', ticketAmount: 50 },
]

const mockCards = [
  { brand: 'mock', id: 'card_1', last4: '1234' },
  { brand: 'mock', id: 'card_2', last4: '4321' },
  { brand: 'mock', id: 'card_3', last4: '2222' },
]

window.Stripe = () => {}

jest.mock('../../design/Layout/RegisterPageView')

jest.mock('react-stripe-elements', () => ({
  CardCVCElement: props => <input {...props} />,
  CardExpiryElement: props => <input {...props} />,
  CardNumberElement: props => <input {...props} />,
  Elements: props => <div {...props} />,
  StripeProvider: ({ children }) => <div>{children}</div>,
  injectStripe: Component => Component,
}))

jest.mock('croods', () => ({
  List: props => (
    <div {...props}>
      {props.children} - Render: {props.render(mockList)}
    </div>
  ),
  New: props => (
    <div {...props}>
      New - <div>render - {props.render(props)}</div>
    </div>
  ),
}))

jest.mock('../../design/AdminText/AdminText', () => props => (
  <div {...props}>
    AdminText -{' '}
    {props.render({
      creditCardTitle: 'Purchase diamonds to play',
    })}
  </div>
))

describe('when component is mounted', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<PaymentInfo currentUser purchaseId={1} cards={mockCards} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('render the card form', () => {
    const tree = renderer.create(<CreditCardFields />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('redirects correctly', () => {
    const tree = renderer.create(<PaymentInfo />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('when click on card item', () => {
  it('when select a card in the list', () => {
    const mockSetState = jest.fn()

    handleSelectCard(mockSetState, 'card_1')()
    expect(mockSetState).toHaveBeenCalledWith('card_1')
  })
})

describe('test the actions after payment', () => {
  it('redirects after purchase and update the tickets', () => {
    const params = {
      currentUser: { id: 1, tickets: 0 },
      navigate: jest.fn(),
      purchase: { ticketAmount: 10 },
      setCurrentUser: jest.fn(),
    }
    afterPurchase(params)()

    expect(params.setCurrentUser).toHaveBeenCalledWith({
      id: 1,
      tickets: 10,
    })
    expect(params.navigate).toHaveBeenCalledWith('/game')
  })

  it('handle the submit process on sucess', async () => {
    const params = {
      create: jest.fn(),
      purchase: { id: 1 },
      selectedCard: 'new',
      setError: jest.fn(),
      stripe: {
        createToken: () => Promise.resolve({ token: { id: '101010' } }),
      },
    }

    await handleSubmit(params)({ preventDefault: jest.fn() })
    expect(params.create).toHaveBeenCalledWith({
      credit_card_token: '101010',
      purchase_option_id: 1,
    })
  })

  it('handle the submit process with a selected card', async () => {
    const params = {
      create: jest.fn(),
      purchase: { id: 1 },
      selectedCard: 'card_1234',
      setError: jest.fn(),
    }

    await handleSubmit(params)({ preventDefault: jest.fn() })
    expect(params.create).toHaveBeenCalledWith({
      credit_card_source: 'card_1234',
      purchase_option_id: 1,
    })
  })

  it('handle the submit process on error', async () => {
    const params = {
      create: jest.fn(),
      purchase: { id: 1 },
      selectedCard: 'new',
      setError: jest.fn(),
      stripe: {
        createToken: () =>
          Promise.resolve({ error: { message: 'invalid number' } }),
      },
    }

    await handleSubmit(params)({ preventDefault: jest.fn() })
    expect(params.setError).toHaveBeenCalledWith('invalid number')
  })

  it('handle the submit process with a crash', async () => {
    const params = {
      create: jest.fn(),
      purchase: { id: 1 },
      selectedCard: 'new',
      setError: jest.fn(),
      stripe: {
        createToken: () => {
          throw new Error('network error')
        },
      },
    }

    await handleSubmit(params)({ preventDefault: jest.fn() })
    expect(params.setError).toHaveBeenCalledWith('network error')
  })
})
