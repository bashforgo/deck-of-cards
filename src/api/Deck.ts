import { Random } from './interfaces'
import { Card, suits, values } from './types'

const freshDeck: Card[] = []
for (const suit of suits) {
  for (const value of values) {
    freshDeck.push({ suit, value })
  }
}

export class Deck {
  public get size(): number {
    return this._cards.length
  }

  public static from(deck: Deck): Deck {
    return new Deck(deck._random)
  }

  private _cards: Card[] = [...freshDeck]
  constructor(private _random: Random = Math) {}

  public draw(): Card {
    this._checkCardsLeft()
    return this._cards.shift() as Card
  }

  public drawMultiple(n: number): Card[] {
    return Array(n)
      .fill(0)
      .map(() => this.draw())
  }

  public drawRandom(): Card {
    this._checkCardsLeft()

    const index: number = Math.round(this._random.random() * (this.size - 1))

    return this._cards.splice(index, 1)[0]
  }

  public shuffle(): void {
    const shuffled: Card[] = []

    while (this._cards.length) {
      shuffled.push(this.drawRandom())
    }

    this._cards = shuffled
  }

  private _checkCardsLeft(): void {
    if (!this.size) {
      throw new Error('deck is empty')
    }
  }
}
