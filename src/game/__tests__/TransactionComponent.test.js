import { createWithSource } from '../TransactionComponent'

describe('when component is triggered to execute the transaction', () => {
  it('should send the source together with amount', () => {
    const mockCreate = jest.fn()

    createWithSource('play', mockCreate)({ amount: 1 })
    expect(mockCreate).toHaveBeenCalledWith({
      amount: 1,
      source: 'play',
    })
  })
})
