export enum Suit {
  CLUBS = '♣',
  SPADES = '♠',
  HEARTS = '♥',
  DIAMONDS = '♦',
}
export const { CLUBS, SPADES, HEARTS, DIAMONDS }: typeof Suit = Suit
export const suits: Suit[] = [CLUBS, SPADES, HEARTS, DIAMONDS]

export enum Value {
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'J',
  QUEEN = 'Q',
  KING = 'K',
  ACE = 'A',
}
export const {
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  ACE,
}: typeof Value = Value
export const values: Value[] = [
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  ACE,
]

export interface Card {
  suit: Suit
  value: Value
}
