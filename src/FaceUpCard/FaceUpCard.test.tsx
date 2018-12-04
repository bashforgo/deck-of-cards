import { Typography } from '@material-ui/core'
import { createMount, createShallow } from '@material-ui/core/test-utils'
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme'
import {
  CardsClub,
  CardsDiamond,
  CardsHeart,
  CardsSpade,
  ChessKing,
  ChessKnight,
  ChessQueen,
} from 'mdi-material-ui'
import React from 'react'
import {
  ACE,
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
} from '../api'
import FaceUpCard from './FaceUpCard'

describe('FaceUpCard', () => {
  describe('when rendering suits', () => {
    let card: ReactWrapper
    let _mount: typeof mount

    beforeEach(() => {
      _mount = createMount()
    })

    describe('clubs', () => {
      beforeEach(() => {
        card = _mount(<FaceUpCard card={{ suit: CLUBS, value: FIVE }} />)
      })

      it('should render icons black', () => {
        expect(
          getComputedStyle(
            card
              .find(CardsClub)
              .at(0)
              .getDOMNode(),
          ),
        ).toMatchObject({ color: 'rgb(33, 33, 33)' })
      })
    })

    describe('spades', () => {
      beforeEach(() => {
        card = _mount(<FaceUpCard card={{ suit: SPADES, value: TWO }} />)
      })

      it('should render icons black', () => {
        expect(
          getComputedStyle(
            card
              .find(CardsSpade)
              .at(0)
              .getDOMNode(),
          ),
        ).toMatchObject({ color: 'rgb(33, 33, 33)' })
      })
    })

    describe('hearts', () => {
      beforeEach(() => {
        card = _mount(<FaceUpCard card={{ suit: HEARTS, value: SEVEN }} />)
      })

      it('should render icons red', () => {
        expect(
          getComputedStyle(
            card
              .find(CardsHeart)
              .at(0)
              .getDOMNode(),
          ),
        ).toMatchObject({ color: 'rgb(244, 67, 54)' })
      })
    })

    describe('diamonds', () => {
      beforeEach(() => {
        card = _mount(<FaceUpCard card={{ suit: DIAMONDS, value: TEN }} />)
      })

      it('should render icons red', () => {
        expect(
          getComputedStyle(
            card
              .find(CardsDiamond)
              .at(0)
              .getDOMNode(),
          ),
        ).toMatchObject({ color: 'rgb(244, 67, 54)' })
      })
    })
  })

  describe('when rendering values', () => {
    let card: ShallowWrapper
    let _shallow: typeof shallow

    beforeEach(() => {
      _shallow = createShallow({ dive: true })
    })

    describe('two', () => {
      beforeEach(() => {
        card = _shallow(<FaceUpCard card={{ suit: CLUBS, value: TWO }} />)
      })

      it('should render the appropriate amount of icons', () => {
        expect(card.find(CardsClub).length).toBe(2 + 2)
        expect(card.find(CardsSpade).length).toBe(0)
        expect(card.find(CardsHeart).length).toBe(0)
        expect(card.find(CardsDiamond).length).toBe(0)
      })
    })

    describe('three', () => {
      beforeEach(() => {
        card = _shallow(<FaceUpCard card={{ suit: SPADES, value: THREE }} />)
      })

      it('should render the appropriate amount of icons', () => {
        expect(card.find(CardsClub).length).toBe(0)
        expect(card.find(CardsSpade).length).toBe(3 + 2)
        expect(card.find(CardsHeart).length).toBe(0)
        expect(card.find(CardsDiamond).length).toBe(0)
      })
    })

    describe('four', () => {
      beforeEach(() => {
        card = _shallow(<FaceUpCard card={{ suit: HEARTS, value: FOUR }} />)
      })

      it('should render the appropriate amount of icons', () => {
        expect(card.find(CardsClub).length).toBe(0)
        expect(card.find(CardsSpade).length).toBe(0)
        expect(card.find(CardsHeart).length).toBe(4 + 2)
        expect(card.find(CardsDiamond).length).toBe(0)
      })
    })

    describe('five', () => {
      beforeEach(() => {
        card = _shallow(<FaceUpCard card={{ suit: DIAMONDS, value: FIVE }} />)
      })

      it('should render the appropriate amount of icons', () => {
        expect(card.find(CardsClub).length).toBe(0)
        expect(card.find(CardsSpade).length).toBe(0)
        expect(card.find(CardsHeart).length).toBe(0)
        expect(card.find(CardsDiamond).length).toBe(5 + 2)
      })
    })

    describe('six', () => {
      beforeEach(() => {
        card = _shallow(<FaceUpCard card={{ suit: CLUBS, value: SIX }} />)
      })

      it('should render the appropriate amount of icons', () => {
        expect(card.find(CardsClub).length).toBe(6 + 2)
        expect(card.find(CardsSpade).length).toBe(0)
        expect(card.find(CardsHeart).length).toBe(0)
        expect(card.find(CardsDiamond).length).toBe(0)
      })
    })

    describe('seven', () => {
      beforeEach(() => {
        card = _shallow(<FaceUpCard card={{ suit: SPADES, value: SEVEN }} />)
      })

      it('should render the appropriate amount of icons', () => {
        expect(card.find(CardsClub).length).toBe(0)
        expect(card.find(CardsSpade).length).toBe(7 + 2)
        expect(card.find(CardsHeart).length).toBe(0)
        expect(card.find(CardsDiamond).length).toBe(0)
      })
    })

    describe('eight', () => {
      beforeEach(() => {
        card = _shallow(<FaceUpCard card={{ suit: HEARTS, value: EIGHT }} />)
      })

      it('should render the appropriate amount of icons', () => {
        expect(card.find(CardsClub).length).toBe(0)
        expect(card.find(CardsSpade).length).toBe(0)
        expect(card.find(CardsHeart).length).toBe(8 + 2)
        expect(card.find(CardsDiamond).length).toBe(0)
      })
    })

    describe('nine', () => {
      beforeEach(() => {
        card = _shallow(<FaceUpCard card={{ suit: DIAMONDS, value: NINE }} />)
      })

      it('should render the appropriate amount of icons', () => {
        expect(card.find(CardsClub).length).toBe(0)
        expect(card.find(CardsSpade).length).toBe(0)
        expect(card.find(CardsHeart).length).toBe(0)
        expect(card.find(CardsDiamond).length).toBe(9 + 2)
      })
    })

    describe('ten', () => {
      beforeEach(() => {
        card = _shallow(<FaceUpCard card={{ suit: CLUBS, value: TEN }} />)
      })

      it('should render the appropriate amount of icons', () => {
        expect(card.find(CardsClub).length).toBe(10 + 2)
        expect(card.find(CardsSpade).length).toBe(0)
        expect(card.find(CardsHeart).length).toBe(0)
        expect(card.find(CardsDiamond).length).toBe(0)
      })
    })

    describe('jack', () => {
      beforeEach(() => {
        card = _shallow(<FaceUpCard card={{ suit: SPADES, value: JACK }} />)
      })

      it('should render the appropriate amount of icons', () => {
        expect(card.find(CardsClub).length).toBe(0)
        expect(card.find(CardsSpade).length).toBe(0 + 2)
        expect(card.find(CardsHeart).length).toBe(0)
        expect(card.find(CardsDiamond).length).toBe(0)
        expect(card.find(ChessKnight).length).toBe(1)
      })
    })

    describe('queen', () => {
      beforeEach(() => {
        card = _shallow(<FaceUpCard card={{ suit: HEARTS, value: QUEEN }} />)
      })

      it('should render the appropriate amount of icons', () => {
        expect(card.find(CardsClub).length).toBe(0)
        expect(card.find(CardsSpade).length).toBe(0)
        expect(card.find(CardsHeart).length).toBe(0 + 2)
        expect(card.find(CardsDiamond).length).toBe(0)
        expect(card.find(ChessQueen).length).toBe(1)
      })
    })

    describe('king', () => {
      beforeEach(() => {
        card = _shallow(<FaceUpCard card={{ suit: DIAMONDS, value: KING }} />)
      })

      it('should render the appropriate amount of icons', () => {
        expect(card.find(CardsClub).length).toBe(0)
        expect(card.find(CardsSpade).length).toBe(0)
        expect(card.find(CardsHeart).length).toBe(0)
        expect(card.find(CardsDiamond).length).toBe(0 + 2)
        expect(card.find(ChessKing).length).toBe(1)
      })
    })

    describe('ace', () => {
      beforeEach(() => {
        card = _shallow(<FaceUpCard card={{ suit: CLUBS, value: ACE }} />)
      })

      it('should render the appropriate amount of icons', () => {
        expect(card.find(CardsClub).length).toBe(1 + 2)
        expect(card.find(CardsSpade).length).toBe(0)
        expect(card.find(CardsHeart).length).toBe(0)
        expect(card.find(CardsDiamond).length).toBe(0)
      })
    })
  })
})
