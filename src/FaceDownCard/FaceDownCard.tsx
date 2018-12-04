import { Grid } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import React, { Component, ReactNode } from 'react'
import BaseCard from '../BaseCard/BaseCard'

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  container: {
    height: '100%',
    padding: theme.spacing.unit * 2,
    borderRadius: 'inherit',
  },
  background: {
    // http://www.patternify.com/
    background: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAI0lEQVQImWP4z8CQxoAFwMXRFWBogAngMomwBE4jCToGWQEAPPESIvDpe80AAAAASUVORK5CYII=) repeat`,
    border: `0.5px solid ${theme.palette.grey[400]}`,
    borderRadius: 'inherit',
  },
})

class FaceDownCard extends Component<WithStyles> {
  public render(): ReactNode {
    const { classes }: this['props'] = this.props

    return (
      <BaseCard>
        <Grid container className={classes.container}>
          <Grid item xs={12} className={classes.background} />
        </Grid>
      </BaseCard>
    )
  }
}

export default withStyles(styles)(FaceDownCard)
