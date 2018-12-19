import { Button, CssBaseline, Grid, TextField } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import React, { ChangeEvent, Component, FormEvent, ReactNode } from 'react'
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
    display: 'grid',
    padding: theme.spacing.unit * 10,
    gridTemplateAreas: `
      "table deck"
      "table controls"`,
    gridTemplateColumns: '3fr 1fr',
    gridTemplateRows: '1fr 1fr',
    [theme.breakpoints.down('sm')]: {
      gridTemplateAreas: `
        "table table"
        "deck controls"`,
      gridTemplateColumns: '1fr 2fr',
      gridTemplateRows: '2fr 1fr',
      padding: theme.spacing.unit,
    },
  },
  table: {
    gridArea: 'table',
    overflow: 'scroll',
    [theme.breakpoints.up('md')]: {
      alignContent: 'start',
    },
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'nowrap',
      paddingLeft: MOBILE_CARD_OVERLAYING,
      alignItems: 'center',
    },
  },
  card: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: -MOBILE_CARD_OVERLAYING,
    },
  },
  deck: {
    gridArea: 'deck',
    display: 'grid',
    placeItems: 'center center',
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(0.5)',
      margin: '-25%',
    },
  },
  controls: {
    gridArea: 'controls',
    display: 'grid',
    placeItems: 'center start',
    placeContent: 'space-evenly start',
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
    const { deck, drawAmount, table }: this['state'] = this.state

    return (
      <main className={classes.container}>
        <CssBaseline />
        <Grid
          container
          spacing={8}
          className={classes.table}
          component="section"
        >
          {table
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
        <section className={classes.deck}>
          <DisplayDeck size={deck.size} />
        </section>
        <section className={classes.controls}>
          <Button onClick={this.sort} disabled={!table.length}>
            sort
          </Button>
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
          <Button onClick={this.shuffleDeck} disabled={!table.length}>
            shuffle deck
          </Button>
        </section>
      </main>
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
