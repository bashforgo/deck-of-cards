import { withStyles } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
} from '@material-ui/core/styles'
import React, { Component, ReactElement, ReactNode } from 'react'
import BaseCard from '../BaseCard/BaseCard'
import FaceDownCard from '../FaceDownCard/FaceDownCard'
import Repeat from '../Repeat/Repeat'

export interface DisplayDeckProps {
  size: number
}

const MAX_FACE_DOWN: number = 8
const X_SCALE_FACTOR: number = 2
const Y_SCALE_FACTOR: number = 1.3

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  container: {
    marginRight: MAX_FACE_DOWN * X_SCALE_FACTOR,
    marginBottom: MAX_FACE_DOWN * Y_SCALE_FACTOR,
    display: 'grid',
    grid: '1fr / 1fr',
  },
  empty: {
    marginRight: MAX_FACE_DOWN * X_SCALE_FACTOR,
    marginBottom: MAX_FACE_DOWN * Y_SCALE_FACTOR,
    opacity: 0.5,
  },
  card: {
    gridRow: '1 / -1',
    gridColumn: '1 / -1',
    ...((): StyleRules => {
      const result: StyleRules = {}

      Array.from({ length: MAX_FACE_DOWN }).forEach((_: unknown, i: number) => {
        const n: number = i + 1
        const x: number = X_SCALE_FACTOR * i
        const y: number = Y_SCALE_FACTOR * i
        result[`&:nth-child(${n})`] = {
          transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`,
        }
      })

      return result
    })(),
  },
})

class DisplayDeck extends Component<DisplayDeckProps & WithStyles> {
  public render(): ReactNode {
    const { size, classes }: this['props'] = this.props
    const card: ReactElement<{}> = (
      <div className={classes.card}>
        <FaceDownCard />
      </div>
    )

    let times: number
    if (size >= 50) {
      times = 8
    } else if (size >= 40) {
      times = 7
    } else if (size >= 30) {
      times = 6
    } else if (size >= 20) {
      times = 5
    } else if (size >= 10) {
      times = 4
    } else if (size >= 5) {
      times = 3
    } else if (size >= 2) {
      times = 2
    } else if (size >= 1) {
      times = 1
    } else {
      return (
        <div className={classes.empty}>
          <BaseCard />
        </div>
      )
    }

    return (
      <div className={classes.container}>
        <Repeat times={times} children={card} />
      </div>
    )
  }
}

export default withStyles(styles)(DisplayDeck)
