import { Grid } from '@material-ui/core'
import { createMount } from '@material-ui/core/test-utils'
import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import FaceDownCard from './FaceDownCard'

describe('FaceDownCard', () => {
  let faceDownCard: ReactWrapper

  beforeEach(() => {
    const _mount: typeof mount = createMount()
    faceDownCard = _mount(<FaceDownCard />)
  })

  it('should render a card with a background', () => {
    expect(
      getComputedStyle(
        faceDownCard
          .find(Grid)
          .at(1)
          .getDOMNode(),
      ),
    ).toMatchObject({
      background:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAI0lEQVQImWP4z8CQxoAFwMXRFWBogAngMomwBE4jCToGWQEAPPESIvDpe80AAAAASUVORK5CYII=) repeat',
      border: '0.5px solid #bdbdbd',
      'border-radius': 'inherit',
    })
  })
})
