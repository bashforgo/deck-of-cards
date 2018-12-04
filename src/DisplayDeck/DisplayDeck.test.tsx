import { Card } from '@material-ui/core'
import { createMount, createShallow } from '@material-ui/core/test-utils'
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import BaseCard from '../BaseCard/BaseCard'
import FaceDownCard from '../FaceDownCard/FaceDownCard'
import DisplayDeck from './DisplayDeck'

describe('DisplayDeck', () => {
  function create(size: number): ReactWrapper {
    const _mount: typeof mount = createMount()
    return _mount(<DisplayDeck size={size} />)
  }

  describe('when more than 50 cards in deck', () => {
    let deck: ReactWrapper

    beforeEach(() => {
      deck = create(50)
    })

    it('should display 8 face down cards', () => {
      expect(deck.find(FaceDownCard).length).toBe(8)
    })

    it('should translate the card', () => {
      expect(
        getComputedStyle(
          deck
            .find(FaceDownCard)
            .last()
            .parents()
            .at(0)
            .getDOMNode(),
        ),
      ).toMatchObject({ transform: 'translate(14.0px, 9.1px)' })
    })
  })

  describe('when more than 40 cards in deck', () => {
    let deck: ReactWrapper

    beforeEach(() => {
      deck = create(40)
    })

    it('should display 7 face down cards', () => {
      expect(deck.find(FaceDownCard).length).toBe(7)
    })

    it('should translate the card', () => {
      expect(
        getComputedStyle(
          deck
            .find(FaceDownCard)
            .last()
            .parents()
            .at(0)
            .getDOMNode(),
        ),
      ).toMatchObject({ transform: 'translate(12.0px, 7.8px)' })
    })
  })

  describe('when more than 30 cards in deck', () => {
    let deck: ReactWrapper

    beforeEach(() => {
      deck = create(30)
    })

    it('should display 6 face down cards', () => {
      expect(deck.find(FaceDownCard).length).toBe(6)
    })

    it('should translate the card', () => {
      expect(
        getComputedStyle(
          deck
            .find(FaceDownCard)
            .last()
            .parents()
            .at(0)
            .getDOMNode(),
        ),
      ).toMatchObject({ transform: 'translate(10.0px, 6.5px)' })
    })
  })

  describe('when more than 20 cards in deck', () => {
    let deck: ReactWrapper

    beforeEach(() => {
      deck = create(20)
    })

    it('should display 5 face down cards', () => {
      expect(deck.find(FaceDownCard).length).toBe(5)
    })

    it('should translate the card', () => {
      expect(
        getComputedStyle(
          deck
            .find(FaceDownCard)
            .last()
            .parents()
            .at(0)
            .getDOMNode(),
        ),
      ).toMatchObject({ transform: 'translate(8.0px, 5.2px)' })
    })
  })

  describe('when more than 10 cards in deck', () => {
    let deck: ReactWrapper

    beforeEach(() => {
      deck = create(10)
    })

    it('should display 4 face down cards', () => {
      expect(deck.find(FaceDownCard).length).toBe(4)
    })

    it('should translate the card', () => {
      expect(
        getComputedStyle(
          deck
            .find(FaceDownCard)
            .last()
            .parents()
            .at(0)
            .getDOMNode(),
        ),
      ).toMatchObject({ transform: 'translate(6.0px, 3.9px)' })
    })
  })

  describe('when more than 5 cards in deck', () => {
    let deck: ReactWrapper

    beforeEach(() => {
      deck = create(5)
    })

    it('should display 3 face down cards', () => {
      expect(deck.find(FaceDownCard).length).toBe(3)
    })

    it('should translate the card', () => {
      expect(
        getComputedStyle(
          deck
            .find(FaceDownCard)
            .last()
            .parents()
            .at(0)
            .getDOMNode(),
        ),
      ).toMatchObject({ transform: 'translate(4.0px, 2.6px)' })
    })
  })

  describe('when more than 2 cards in deck', () => {
    let deck: ReactWrapper

    beforeEach(() => {
      deck = create(2)
    })

    it('should display 2 face down cards', () => {
      expect(deck.find(FaceDownCard).length).toBe(2)
    })

    it('should translate the card', () => {
      expect(
        getComputedStyle(
          deck
            .find(FaceDownCard)
            .last()
            .parents()
            .at(0)
            .getDOMNode(),
        ),
      ).toMatchObject({ transform: 'translate(2.0px, 1.3px)' })
    })
  })

  describe('when only one card in deck', () => {
    let deck: ReactWrapper

    beforeEach(() => {
      deck = create(1)
    })

    it('should display only one face down card', () => {
      expect(deck.find(FaceDownCard).length).toBe(1)
    })

    it('should not translate the card', () => {
      expect(
        getComputedStyle(
          deck
            .find(FaceDownCard)
            .last()
            .parents()
            .at(0)
            .getDOMNode(),
        ),
      ).toMatchObject({
        transform: 'translate(0.0px, 0.0px)',
        position: 'unset',
      })
    })
  })

  describe('when no cards in deck', () => {
    let deck: ReactWrapper

    beforeEach(() => {
      deck = create(0)
    })

    it('should display no face down cards', () => {
      expect(deck.find(FaceDownCard).length).toBe(0)
    })

    it('should display a transparent blank card', () => {
      expect(deck.find(BaseCard).length).toBe(1)
      expect(
        getComputedStyle(
          deck
            .find(BaseCard)
            .parents()
            .at(0)
            .getDOMNode(),
        ),
      ).toMatchObject({ opacity: '0.5' })
    })
  })
})
