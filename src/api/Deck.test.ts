import { Deck } from './Deck'
import { Random } from './interfaces'

describe('Deck', () => {
  const notRandom: Random = {
    /**
     * disables shuffling
     */
    random(): number {
      return 0
    },
  }
  const freshDeck: Deck = new Deck(notRandom)
  let defaultDeck: Deck

  beforeEach(() => {
    defaultDeck = new Deck()
  })

  describe('when creating a new Deck', () => {
    it('should not fail', () => {
      expect(defaultDeck).not.toBeUndefined()
    })
  })

  describe('when using a custom randomiser', () => {
    let deck: Deck

    beforeEach(() => {
      deck = new Deck(notRandom)
      deck.shuffle()
    })

    it('should use it to shuffle the deck', () => {
      expect(deck).toEqual(freshDeck)
    })
  })

  describe('when drawing', () => {
    describe('singles', () => {
      it('should draw from the top of the deck, removing the card', () => {
        expect(defaultDeck.draw()).toEqual({ suit: '♣', value: '2' })
        expect(defaultDeck.size).toBe(51)
        expect(defaultDeck.draw()).toEqual({ suit: '♣', value: '3' })
        expect(defaultDeck.size).toBe(50)
        expect(defaultDeck.draw()).toEqual({ suit: '♣', value: '4' })
        expect(defaultDeck.size).toBe(49)
      })
    })

    describe('multiples', () => {
      it('should draw from the top of the deck, removing the cards', () => {
        expect(defaultDeck.drawMultiple(3)).toEqual([
          { suit: '♣', value: '2' },
          { suit: '♣', value: '3' },
          { suit: '♣', value: '4' },
        ])
        expect(defaultDeck.size).toBe(49)
      })
    })

    describe('singles from the middle', () => {
      let deck: Deck

      beforeEach(() => {
        deck = new Deck({
          /**
           * draws from the middle
           */
          random(): number {
            return 0.5
          },
        })
      })

      it('should use the randomiser to draw from the middle, removing the card', () => {
        expect(deck.drawRandom()).toEqual({ suit: '♥', value: '2' })
        expect(deck.size).toBe(51)
      })
    })
  })

  describe('when shuffling', () => {
    let deck: Deck

    beforeEach(() => {
      deck = new Deck({
        /**
         * reverses deck when shuffling
         */
        random(): number {
          return 0.999
        },
      })
      deck.shuffle()
    })

    it('should use the randomiser to shuffle the deck', () => {
      expect(deck.draw()).toEqual({ suit: '♦', value: 'A' })
      expect(deck.draw()).toEqual({ suit: '♦', value: 'K' })
      expect(deck.draw()).toEqual({ suit: '♦', value: 'Q' })
      expect(deck.draw()).toEqual({ suit: '♦', value: 'J' })
    })
  })

  describe('when the deck is emptied', () => {
    beforeEach(() => {
      defaultDeck.drawMultiple(52)
    })

    it('should throw when drawing', () => {
      expect(() => defaultDeck.draw()).toThrowError('deck is empty')
      expect(() => defaultDeck.drawRandom()).toThrowError('deck is empty')
      expect(() => defaultDeck.drawMultiple(10)).toThrowError('deck is empty')
    })

    it('should not throw when shuffling', () => {
      expect(() => defaultDeck.shuffle()).not.toThrowError('deck is empty')
    })
  })
})
