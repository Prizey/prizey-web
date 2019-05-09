import { afterCreate, handleClick } from '../DifficultyButton'

it('test the afterCreate', () => {
  const params = {
    navigate: jest.fn(),
    setCurrentUser: jest.fn(),
    to: '/url',
  }
  const user = {
    id: 1,
    tickets: 100,
  }

  afterCreate(params)({ created: { user } })

  expect(params.setCurrentUser).toHaveBeenCalledWith(user)
  expect(params.navigate).toHaveBeenCalledWith(params.to)
})

describe('test the action on button click', () => {
  it('when dont have tickets, go to buy-more', () => {
    const params = {
      availableTickets: 1,
      create: jest.fn(),
      navigate: jest.fn(),
      quantity: 10,
    }

    handleClick(params)()
    expect(params.navigate).toHaveBeenCalledWith('/buy-more')
  })

  it('when have tickets enough, call the create', () => {
    const params = {
      availableTickets: 10,
      create: jest.fn(),
      navigate: jest.fn(),
      quantity: 10,
    }

    handleClick(params)()
    expect(params.create).toHaveBeenCalledWith({
      amount: -10,
    })
  })
})
