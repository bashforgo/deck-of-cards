import { Button, TextField } from '@material-ui/core'
import { createShallow } from '@material-ui/core/test-utils'
import { shallow, ShallowWrapper } from 'enzyme'
import React, { ChangeEvent } from 'react'
import {
  CLUBS,
  Deck,
  DIAMONDS,
  FIVE,
  FOUR,
  NINE,
  QUEEN,
  SEVEN,
  SIX,
  SPADES,
  THREE,
  TWO,
} from '../api'
import DisplayDeck from '../DisplayDeck/DisplayDeck'
import FaceUpCard from '../FaceUpCard/FaceUpCard'
import App, { AppState } from './App'

describe('App', () => {
  let app: ShallowWrapper<{}, AppState>

  describe('when drawing', () => {
    describe('singles', () => {
      interface AppInstance {
        draw(): void
        drawMultiple(): void
      }
      let appInstance: AppInstance
      let table: ShallowWrapper
      let deck: ShallowWrapper

      beforeEach(() => {
        const _shallow: typeof shallow = createShallow({ dive: true })
        app = _shallow(<App />)
        app.setState({ deck: new Deck() })
        appInstance = (app.instance() as unknown) as AppInstance
        appInstance.draw()
        table = app.find(FaceUpCard)
        deck = app.find(DisplayDeck)
      })

      it('should show the cards in order', () => {
        expect(table.length).toBe(1)
        expect(table.at(0).props()).toMatchObject({
          card: { suit: CLUBS, value: TWO },
        })
      })

      it('should reflect the deck size', () => {
        expect(deck.props()).toMatchObject({ size: 51 })
      })

      describe('when drawing more', () => {
        beforeEach(() => {
          appInstance.draw()
          appInstance.draw()
          table = app.find(FaceUpCard)
          deck = app.find(DisplayDeck)
        })

        it('should show the cards in order', () => {
          expect(table.length).toBe(3)
          expect(table.at(0).props()).toMatchObject({
            card: { suit: CLUBS, value: FOUR },
          })
          expect(table.at(1).props()).toMatchObject({
            card: { suit: CLUBS, value: THREE },
          })
          expect(table.at(2).props()).toMatchObject({
            card: { suit: CLUBS, value: TWO },
          })
        })

        it('should reflect the deck size', () => {
          expect(deck.props()).toMatchObject({ size: 49 })
        })

        describe('when the deck is empty', () => {
          beforeEach(() => {
            app.setState({ drawAmount: 49 })
            appInstance.drawMultiple()
            deck = app.find(DisplayDeck)
          })

          it('should disable the draw button', () => {
            const button: ShallowWrapper = app.find(Button).at(1)
            expect(button.props()).toMatchObject({ disabled: true })
          })

          it('should reflect the deck size', () => {
            expect(deck.props()).toMatchObject({ size: 0 })
          })
        })
      })
    })

    describe('multiples', () => {
      interface AppInstance {
        drawMultiple(): void
      }
      let appInstance: AppInstance
      let table: ShallowWrapper
      let deck: ShallowWrapper

      beforeEach(() => {
        const _shallow: typeof shallow = createShallow({ dive: true })
        app = _shallow(<App />)
        app.setState({ deck: new Deck(), drawAmount: 5 })
        appInstance = (app.instance() as unknown) as AppInstance
        appInstance.drawMultiple()
        table = app.find(FaceUpCard)
        deck = app.find(DisplayDeck)
      })

      it('should show the cards in order', () => {
        expect(table.length).toBe(5)
        expect(table.at(0).props()).toMatchObject({
          card: { suit: CLUBS, value: SIX },
        })
        expect(table.at(1).props()).toMatchObject({
          card: { suit: CLUBS, value: FIVE },
        })
        expect(table.at(2).props()).toMatchObject({
          card: { suit: CLUBS, value: FOUR },
        })
        expect(table.at(3).props()).toMatchObject({
          card: { suit: CLUBS, value: THREE },
        })
        expect(table.at(4).props()).toMatchObject({
          card: { suit: CLUBS, value: TWO },
        })
      })

      it('should reflect the deck size', () => {
        expect(deck.props()).toMatchObject({ size: 47 })
      })
    })

    describe('multiples using the form', () => {
      interface AppInstance {
        onAmountChange(event: ChangeEvent<HTMLInputElement>): void
      }
      let appInstance: AppInstance
      let table: ShallowWrapper
      let deck: ShallowWrapper
      let form: ShallowWrapper
      let input: ShallowWrapper

      beforeEach(() => {
        const _shallow: typeof shallow = createShallow({ dive: true })
        app = _shallow(<App />)
        app.setState({ deck: new Deck() })
        appInstance = (app.instance() as unknown) as AppInstance
        appInstance.onAmountChange({ target: { value: '8' } } as ChangeEvent<
          HTMLInputElement
        >)
        form = app.find('form')
        input = app.find(TextField)
      })

      it('should reflect the value in the text field', () => {
        expect(app.state()).toMatchObject({ drawAmount: 8 })
        expect(input.props()).toMatchObject({ value: 8 })
      })

      describe('when submitting the form', () => {
        let preventDefault: jest.Mock
        let stopPropagation: jest.Mock

        beforeEach(() => {
          preventDefault = jest.fn()
          stopPropagation = jest.fn()
          form.simulate('submit', { preventDefault, stopPropagation })
          table = app.find(FaceUpCard)
          deck = app.find(DisplayDeck)
        })

        it('should draw the appropriate number of cards', () => {
          expect(table.length).toEqual(8)
        })

        it('should stop propagation and prevent default', () => {
          expect(stopPropagation).toHaveBeenCalledWith()
          expect(preventDefault).toHaveBeenCalledWith()
        })

        it('should reflect the deck size', () => {
          expect(deck.props()).toMatchObject({ size: 44 })
        })

        describe('when trying to draw too much', () => {
          beforeEach(() => {
            appInstance.onAmountChange({
              target: { value: '45' },
            } as ChangeEvent<HTMLInputElement>)
            preventDefault.mockReset()
            stopPropagation.mockReset()
            form.simulate('submit', { preventDefault, stopPropagation })
            table = app.find(FaceUpCard)
            deck = app.find(DisplayDeck)
          })

          it('should disable the draw button', () => {
            const button: ShallowWrapper = app.find(Button).at(2)
            expect(button.props()).toMatchObject({ disabled: true })
          })

          it('should not draw the exceeding number of cards', () => {
            expect(table.length).toEqual(8)
          })

          it('should stop propagation and prevent default', () => {
            expect(stopPropagation).toHaveBeenCalledWith()
            expect(preventDefault).toHaveBeenCalledWith()
          })

          it('should reflect the deck size', () => {
            expect(deck.props()).toMatchObject({ size: 44 })
          })
        })
      })
    })
  })

  describe('when preparing sorting', () => {
    interface AppInstance {
      drawMultiple(): void
      sort(): void
    }
    let appInstance: AppInstance
    let table: ShallowWrapper

    beforeEach(() => {
      function* createNotRandom(): IterableIterator<number> {
        yield 0.2
        yield 0.8
        yield 0.3
        yield 0.1
        yield 0.9
        yield* createNotRandom()
      }
      const notRandom: IterableIterator<number> = createNotRandom()
      const deck: Deck = new Deck({
        random(): number {
          return notRandom.next().value
        },
      })
      deck.shuffle()
      const _shallow: typeof shallow = createShallow({ dive: true })
      app = _shallow(<App />)
      app.setState({
        deck,
        drawAmount: 5,
      })
      appInstance = (app.instance() as unknown) as AppInstance
      appInstance.drawMultiple()
    })

    it('should show the cards in the order they were drawn', () => {
      table = app.find(FaceUpCard)
      expect(table.length).toBe(5)
      expect(table.at(0).props()).toMatchObject({
        card: { suit: DIAMONDS, value: NINE },
      })
      expect(table.at(1).props()).toMatchObject({
        card: { suit: CLUBS, value: SEVEN },
      })
      expect(table.at(2).props()).toMatchObject({
        card: { suit: SPADES, value: FIVE },
      })
      expect(table.at(3).props()).toMatchObject({
        card: { suit: DIAMONDS, value: FOUR },
      })
      expect(table.at(4).props()).toMatchObject({
        card: { suit: CLUBS, value: QUEEN },
      })
    })

    describe('when sorting', () => {
      beforeEach(() => {
        appInstance.sort()
      })

      it('should sort the cards', () => {
        table = app.find(FaceUpCard)
        expect(table.length).toBe(5)
        expect(table.at(0).props()).toMatchObject({
          card: { suit: CLUBS, value: SEVEN },
        })
        expect(table.at(1).props()).toMatchObject({
          card: { suit: CLUBS, value: QUEEN },
        })
        expect(table.at(2).props()).toMatchObject({
          card: { suit: SPADES, value: FIVE },
        })
        expect(table.at(3).props()).toMatchObject({
          card: { suit: DIAMONDS, value: FOUR },
        })
        expect(table.at(4).props()).toMatchObject({
          card: { suit: DIAMONDS, value: NINE },
        })
      })
    })
  })

  describe('when preparing to shuffle', () => {
    interface AppInstance {
      drawMultiple(): void
      shuffleDeck(): void
    }
    let appInstance: AppInstance
    let firstTable: ShallowWrapper
    let secondTable: ShallowWrapper

    beforeEach(() => {
      // deterministic, but subsequent shuffles result in different ordering
      function* createNotRandom(): IterableIterator<number> {
        yield 0.2
        yield 0.8
        yield 0.3
        yield* createNotRandom()
      }
      const notRandom: IterableIterator<number> = createNotRandom()
      const deck: Deck = new Deck({
        random(): number {
          return notRandom.next().value
        },
      })
      deck.shuffle()
      const _shallow: typeof shallow = createShallow({ dive: true })
      app = _shallow(<App />)
      app.setState({ deck, drawAmount: 10 })
      appInstance = (app.instance() as unknown) as AppInstance
      appInstance.drawMultiple()
      firstTable = app.find(FaceUpCard)
      appInstance.shuffleDeck()
      secondTable = app.find(FaceUpCard)
    })

    it('should empty the table', () => {
      expect(secondTable.length).toBe(0)
    })

    describe('when shuffling', () => {
      beforeEach(() => {
        appInstance.drawMultiple()
        secondTable = app.find(FaceUpCard)
      })

      it('should show different cards', () => {
        expect(firstTable).not.toEqual(secondTable)
      })
    })

    describe('when doing subsequent shuffles', () => {
      let firstDeck: Deck
      let secondDeck: Deck

      beforeEach(() => {
        const deck: Deck = new Deck({
          random(): number {
            return 0.5
          },
        })
        app.setState({ deck })
        appInstance.shuffleDeck()
        firstDeck = app.state('deck')
        appInstance.shuffleDeck()
        secondDeck = app.state('deck')
      })

      it('should use a new deck that is identical to the old', () => {
        expect(firstDeck).not.toBe(secondDeck)
        expect(firstDeck).toEqual(secondDeck)
      })
    })
  })
})
