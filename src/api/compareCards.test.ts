import { compareCards, compareCardsReverse } from './compareCards'
import { Deck } from './Deck'
import {
  ACE,
  Card,
  CLUBS,
  DIAMONDS,
  EIGHT,
  FIVE,
  FOUR,
  HEARTS,
  JACK,
  KING,
  NINE,
  QUEEN,
  SEVEN,
  SIX,
  SPADES,
  TEN,
  THREE,
  TWO,
} from './types'

describe('compareCards', () => {
  describe('when sorting using the compare function', () => {
    it('should reult in the proper order', () => {
      const cards: Card[] = [
        { suit: SPADES, value: TWO },
        { suit: DIAMONDS, value: TWO },
        { suit: CLUBS, value: TWO },
        { suit: HEARTS, value: TWO },
      ].sort(compareCards)
      expect(cards).toEqual([
        { suit: CLUBS, value: TWO },
        { suit: SPADES, value: TWO },
        { suit: HEARTS, value: TWO },
        { suit: DIAMONDS, value: TWO },
      ])
    })

    it('should reult in the proper order', () => {
      const cards: Card[] = [
        { suit: HEARTS, value: TWO },
        { suit: HEARTS, value: FOUR },
        { suit: HEARTS, value: TEN },
        { suit: HEARTS, value: SEVEN },
        { suit: HEARTS, value: NINE },
        { suit: HEARTS, value: QUEEN },
        { suit: HEARTS, value: SIX },
        { suit: HEARTS, value: ACE },
        { suit: HEARTS, value: FIVE },
        { suit: HEARTS, value: EIGHT },
        { suit: HEARTS, value: JACK },
        { suit: HEARTS, value: KING },
        { suit: HEARTS, value: THREE },
      ].sort(compareCards)
      expect(cards).toEqual([
        { suit: HEARTS, value: TWO },
        { suit: HEARTS, value: THREE },
        { suit: HEARTS, value: FOUR },
        { suit: HEARTS, value: FIVE },
        { suit: HEARTS, value: SIX },
        { suit: HEARTS, value: SEVEN },
        { suit: HEARTS, value: EIGHT },
        { suit: HEARTS, value: NINE },
        { suit: HEARTS, value: TEN },
        { suit: HEARTS, value: JACK },
        { suit: HEARTS, value: QUEEN },
        { suit: HEARTS, value: KING },
        { suit: HEARTS, value: ACE },
      ])
    })
  })

  describe('when sorting using the reverse compare function', () => {
    it('should reult in the proper order', () => {
      const cards: Card[] = [
        { suit: SPADES, value: TWO },
        { suit: DIAMONDS, value: TWO },
        { suit: CLUBS, value: TWO },
        { suit: HEARTS, value: TWO },
      ].sort(compareCardsReverse)
      expect(cards).toEqual([
        { suit: DIAMONDS, value: TWO },
        { suit: HEARTS, value: TWO },
        { suit: SPADES, value: TWO },
        { suit: CLUBS, value: TWO },
      ])
    })

    it('should reult in the proper order', () => {
      const cards: Card[] = [
        { suit: HEARTS, value: TWO },
        { suit: HEARTS, value: FOUR },
        { suit: HEARTS, value: TEN },
        { suit: HEARTS, value: SEVEN },
        { suit: HEARTS, value: NINE },
        { suit: HEARTS, value: QUEEN },
        { suit: HEARTS, value: SIX },
        { suit: HEARTS, value: ACE },
        { suit: HEARTS, value: FIVE },
        { suit: HEARTS, value: EIGHT },
        { suit: HEARTS, value: JACK },
        { suit: HEARTS, value: KING },
        { suit: HEARTS, value: THREE },
      ].sort(compareCardsReverse)
      expect(cards).toEqual([
        { suit: HEARTS, value: ACE },
        { suit: HEARTS, value: KING },
        { suit: HEARTS, value: QUEEN },
        { suit: HEARTS, value: JACK },
        { suit: HEARTS, value: TEN },
        { suit: HEARTS, value: NINE },
        { suit: HEARTS, value: EIGHT },
        { suit: HEARTS, value: SEVEN },
        { suit: HEARTS, value: SIX },
        { suit: HEARTS, value: FIVE },
        { suit: HEARTS, value: FOUR },
        { suit: HEARTS, value: THREE },
        { suit: HEARTS, value: TWO },
      ])
    })
  })

  describe('when sorting an entire deck', () => {
    let deck: Deck
    let freshDeck: Deck

    beforeEach(() => {
      deck = new Deck()
      deck.shuffle()
      freshDeck = new Deck()
    })

    it('should result in the proper order', () => {
      const sorted: Card[] = deck.drawMultiple(52).sort(compareCards)

      expect(sorted).toEqual(freshDeck.drawMultiple(52))
    })
  })
})
