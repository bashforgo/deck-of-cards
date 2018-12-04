import { Card } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import React, { Component, ReactNode } from 'react'

// http://www.dimensionsinfo.com/credit-card-dimensions/
const CREDIT_CARD_DIMENSIONS: {
  borderRadius: number
  width: number
  height: number
} = {
  borderRadius: 3.18,
  width: 53.98,
  height: 85.6,
}
const SCALE_FACTOR: number = 2.5

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  card: {
    borderRadius: CREDIT_CARD_DIMENSIONS.borderRadius * SCALE_FACTOR,
    width: CREDIT_CARD_DIMENSIONS.width * SCALE_FACTOR,
    height: CREDIT_CARD_DIMENSIONS.height * SCALE_FACTOR,
  },
})

class BaseCard extends Component<WithStyles> {
  public render(): ReactNode {
    const { classes, children }: this['props'] = this.props

    return (
      <Card square className={classes.card}>
        {children}
      </Card>
    )
  }
}

export default withStyles(styles)(BaseCard)
