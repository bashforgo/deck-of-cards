import { Grid, SvgIcon, Typography } from '@material-ui/core'
import { grey, red } from '@material-ui/core/colors'
import { GridProps } from '@material-ui/core/Grid'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import {
  CardsClub,
  CardsDiamond,
  CardsHeart,
  CardsSpade,
  ChessKing,
  ChessKnight,
  ChessQueen,
} from 'mdi-material-ui'
import React, { Component, ComponentType, ReactNode } from 'react'
import {
  ACE,
  Card,
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
import BaseCard from '../BaseCard/BaseCard'

export interface FaceUpCardProps {
  card: Card
}

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  container: {
    height: '100%',
    borderRadius: 'inherit',
    padding: theme.spacing.unit,
  },
  bottomRight: {
    justifySelf: 'end',
  },
  red: {
    color: red[500],
  },
  black: {
    color: grey[900],
  },
  face: {
    height: '100%',
  },
  largeFace: {
    fontSize: theme.typography.h2.fontSize,
  },
})

class FaceUpCard extends Component<FaceUpCardProps & WithStyles> {
  public render(): ReactNode {
    const { classes }: this['props'] = this.props

    return (
      <BaseCard>
        <Grid container className={classes.container}>
          <Grid item container xs={2}>
            {this._getValue()}
          </Grid>
          <Grid item xs={8}>
            {this._getFace()}
          </Grid>
          <Grid item container xs={2}>
            {this._getValue({
              direction: 'column-reverse',
              className: classes.bottomRight,
            })}
          </Grid>
        </Grid>
      </BaseCard>
    )
  }

  private _getIcon(): typeof SvgIcon {
    switch (this.props.card.suit) {
      case CLUBS:
        return CardsClub
      case SPADES:
        return CardsSpade
      case HEARTS:
        return CardsHeart
      case DIAMONDS:
        return CardsDiamond
    }
  }

  private _getColorClassName(): string {
    switch (this.props.card.suit) {
      case CLUBS:
        return this.props.classes.black
      case SPADES:
        return this.props.classes.black
      case HEARTS:
        return this.props.classes.red
      case DIAMONDS:
        return this.props.classes.red
    }
  }

  private _getValue(props?: GridProps): ReactNode {
    const Icon: typeof SvgIcon = this._getIcon()
    const color: string | undefined = this._getColorClassName()

    return (
      <Grid container direction="column" alignItems="center" {...props}>
        <Icon fontSize="small" className={color} />
        <Typography variant="body2" className={color}>
          {this.props.card.value}
        </Typography>
      </Grid>
    )
  }

  private _getFace(): ReactNode {
    const { classes, card }: this['props'] = this.props
    const Icon: typeof SvgIcon = this._getIcon()
    const color: string | undefined = this._getColorClassName()
    let child: ReactNode = null

    switch (card.value) {
      case TWO:
        child = (
          <>
            <Icon className={color} />
            <Icon className={color} />
          </>
        )
        break
      case THREE:
        child = (
          <>
            <Icon className={color} />
            <Icon className={color} />
            <Icon className={color} />
          </>
        )
        break
      case FOUR:
        child = (
          <>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
          </>
        )
        break
      case FIVE:
        child = (
          <>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
            </Grid>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
          </>
        )
        break
      case SIX:
        child = (
          <>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
          </>
        )
        break
      case SEVEN:
        child = (
          <>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
          </>
        )
        break
      case EIGHT:
        child = (
          <>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
          </>
        )
        break
      case NINE:
        child = (
          <>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
          </>
        )
        break
      case TEN:
        child = (
          <>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
            <Grid item container justify="space-evenly">
              <Icon className={color} />
              <Icon className={color} />
              <Icon className={color} />
            </Grid>
          </>
        )
        break
      case JACK:
        child = <ChessKnight className={`${color} ${classes.largeFace}`} />
        break
      case QUEEN:
        child = <ChessQueen className={`${color} ${classes.largeFace}`} />
        break
      case KING:
        child = <ChessKing className={`${color} ${classes.largeFace}`} />
        break
      case ACE:
        child = <Icon className={`${color} ${classes.largeFace}`} />
        break
    }

    return (
      <Grid
        container
        alignItems="center"
        justify="space-evenly"
        direction="column"
        className={classes.face}
      >
        {child}
      </Grid>
    )
  }
}

export default withStyles(styles)(FaceUpCard)
