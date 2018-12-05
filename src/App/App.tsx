import { Button, CssBaseline, Grid, TextField } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import React, {
  ChangeEvent,
  Component,
  ComponentType,
  FormEvent,
  ReactNode,
} from 'react'
import { Card, compareCardsReverse, Deck } from '../api'
import DisplayDeck from '../DisplayDeck/DisplayDeck'
import FaceUpCard from '../FaceUpCard/FaceUpCard'

export interface AppState {
  deck: Deck
  table: Card[]
  drawAmount: number
}

const MOBILE_CARD_OVERLAYING: number = 114

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  container: {
    height: '100vh',
    width: '100vw',
    padding: theme.spacing.unit * 10,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit,
      flexDirection: 'column',
    },
  },
  table: {
    display: 'flex',
    overflow: 'scroll',
    [theme.breakpoints.up('md')]: {
      flex: '3 0 0',
      height: '100%',
      alignContent: 'start',
    },
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'nowrap',
      flex: '2 0 0',
      width: '100%',
      paddingLeft: MOBILE_CARD_OVERLAYING,
      alignItems: 'center',
    },
  },
  card: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: -MOBILE_CARD_OVERLAYING,
    },
  },
  deckAndControls: {
    display: 'flex',
    flex: '1 0 0',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
    },
  },
  deck: {
    flex: '1 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(0.5)',
      margin: '-25%',
    },
  },
  controls: {
    flex: '1 0 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'space-around',
    padding: theme.spacing.unit,
  },
})

class App extends Component<WithStyles, AppState> {
  public state: AppState = { deck: new Deck(), table: [], drawAmount: 3 }
  constructor(props: WithStyles) {
    super(props)
    this.state.deck.shuffle()
    this.sort = this.sort.bind(this)
    this.draw = this.draw.bind(this)
    this.submit = this.submit.bind(this)
    this.drawMultiple = this.drawMultiple.bind(this)
    this.onAmountChange = this.onAmountChange.bind(this)
    this.shuffleDeck = this.shuffleDeck.bind(this)
  }

  public render(): ReactNode {
    const { classes }: this['props'] = this.props
    const { deck, drawAmount }: this['state'] = this.state

    return (
      <Grid container className={classes.container}>
        <CssBaseline />
        <Grid container spacing={8} className={classes.table}>
          {this.state.table
            .map((card: Card, i: number) => (
              <Grid
                item
                key={JSON.stringify(card)}
                className={classes.card}
                style={{ zIndex: i }}
              >
                <FaceUpCard card={card} />
              </Grid>
            ))
            .reverse()}
        </Grid>
        <div className={classes.deckAndControls}>
          <div className={classes.deck}>
            <DisplayDeck size={deck.size} />
          </div>
          <div className={classes.controls}>
            <Button onClick={this.sort}>sort</Button>
            <Button onClick={this.draw} disabled={!deck.size}>
              draw one
            </Button>
            <form onSubmit={this.submit}>
              <Grid container spacing={8}>
                <Grid item xs={6}>
                  <Button
                    onClick={this.drawMultiple}
                    disabled={deck.size < drawAmount}
                  >
                    draw
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={this.onAmountChange}
                    type="number"
                    value={drawAmount}
                  />
                </Grid>
              </Grid>
            </form>
            <Button onClick={this.shuffleDeck}>shuffle deck</Button>
          </div>
        </div>
      </Grid>
    )
  }

  public sort(): void {
    this.setState(
      ({ deck, table, drawAmount }: AppState): AppState => ({
        deck,
        drawAmount,
        table: table.sort(compareCardsReverse),
      }),
    )
  }

  public draw(): void {
    this.setState(
      ({ deck, table, drawAmount }: AppState): AppState => ({
        deck,
        drawAmount,
        table: [...table, deck.draw()],
      }),
    )
  }

  public submit(event: FormEvent): void {
    event.preventDefault()
    event.stopPropagation()

    const { deck, drawAmount }: this['state'] = this.state
    if (deck.size >= drawAmount) {
      this.drawMultiple()
    }
  }

  public drawMultiple(): void {
    this.setState(
      ({ deck, table, drawAmount }: AppState): AppState => ({
        deck,
        drawAmount,
        table: [...table, ...deck.drawMultiple(drawAmount)],
      }),
    )
  }

  public onAmountChange({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void {
    this.setState({ drawAmount: Number(value) })
  }

  public shuffleDeck(): void {
    const deck: Deck = Deck.from(this.state.deck)
    deck.shuffle()

    this.setState({ deck, table: [] })
  }
}

export default withStyles(styles)(App)
