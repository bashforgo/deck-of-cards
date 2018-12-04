import { createShallow } from '@material-ui/core/test-utils'
import { shallow, ShallowWrapper } from 'enzyme'
import React, { ReactElement } from 'react'
import Repeat from './Repeat'

describe('Repeat', () => {
  let repeat: ShallowWrapper
  const content: ReactElement<{}> = <p id="content">the amazing content</p>

  beforeEach(() => {
    const _shallow: typeof shallow = createShallow()
    repeat = _shallow(<Repeat times={5}>{content}</Repeat>)
  })

  it('should repeat children the given amount of times', () => {
    expect(repeat.find('#content').length).toBe(5)
  })
})
