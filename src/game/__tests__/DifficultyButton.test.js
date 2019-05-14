import { afterCreate, handleClick } from '../DifficultyButton'

describe('when the component is clicked', () => {
  describe("when the user doesn't have tickets enough", () => {
    it('navigate to the paywall', () => {
      const params = {
        availableTickets: 1,
        create: jest.fn(),
        navigate: jest.fn(),
        quantity: 10,
      }

      handleClick(params)()
      expect(params.navigate).toHaveBeenCalledWith('/buy-more')
    })
  })

  describe('when the user has tickets enough', () => {
    it('call the create method', () => {
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

    it('call the afterCreate method', () => {
      const params = {
        insertCoin: jest.fn(),
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
  })
})
