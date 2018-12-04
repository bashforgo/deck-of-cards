import { createMount, createShallow } from '@material-ui/core/test-utils'
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import BaseCard from './BaseCard'

describe('BaseCard', () => {
  let _shallow: typeof shallow

  beforeEach(() => {
    _shallow = createShallow()
  })

  it('should render children', () => {
    const baseCard: ShallowWrapper = _shallow(
      <BaseCard>
        <p id="child">content</p>
      </BaseCard>,
    )
    expect(baseCard.find('#child').text()).toBe('content')
  })

  it('should be of a fixed size', () => {
    const _mount: typeof mount = createMount()
    const baseCard: ReactWrapper = _mount(
      <BaseCard>
        <p id="child" />
      </BaseCard>,
    )

    expect(getComputedStyle(baseCard.getDOMNode())).toMatchObject({
      'border-radius': '7.95px',
      height: '214px',
      width: '134.95px',
    })
  })
})
