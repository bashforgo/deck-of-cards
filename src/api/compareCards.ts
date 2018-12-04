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
  Suit,
  TEN,
  THREE,
  TWO,
  Value,
} from './types'

const suitCompareValue: Record<Suit, number> = {
  [CLUBS]: 100,
  [SPADES]: 200,
  [HEARTS]: 300,
  [DIAMONDS]: 400,
}

const valueCompareValue: Record<Value, number> = {
  [TWO]: 2,
  [THREE]: 3,
  [FOUR]: 4,
  [FIVE]: 5,
  [SIX]: 6,
  [SEVEN]: 7,
  [EIGHT]: 8,
  [NINE]: 9,
  [TEN]: 10,
  [JACK]: 11,
  [QUEEN]: 12,
  [KING]: 13,
  [ACE]: 14,
}

/**
 * assign each card a unique number value,
 * so that they can be sorted as if they were numbers
 */
function cardToValue({ suit, value }: Card): number {
  return suitCompareValue[suit] + valueCompareValue[value]
}

export function compareCards(a: Card, b: Card): number {
  return cardToValue(a) - cardToValue(b)
}

export function compareCardsReverse(a: Card, b: Card): number {
  return compareCards(b, a)
}
