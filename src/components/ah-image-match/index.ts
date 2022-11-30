import { LitElement, css, html } from "lit";
import {
  customElement,
  property,
  state,
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-image-match": AHImageMatch;
  }
}

/**
 * An ah-image-match element.
 */
@customElement("ah-image-match")
export class AHImageMatch extends LitElement {
  @state()
  difficultyLevel = "easy";

  @state()
  gameAnimals: any[] = [];

  @state()
  gameState: any[] = [];

  @state()
  showAnimals = false;

  @state()
  guesses: any[] = [];

  @state()
  count = 0;

  @state()
  correctGuesses = 0;

  @property({ type: Number })
  numberOfAnimals = 3; // 1 - 5 currently

  private animals: any = {
    sheep: {
      url: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2573&q=80",
    },
    cat: {
      url: "https://images.unsplash.com/photo-1609266086311-0dcf0dcc00dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    },
    dog: {
      url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
    },
    horse: {
      url: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1948&q=80",
    },
    pig: {
      url: "https://images.unsplash.com/photo-1567201080580-bfcc97dae346?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80",
    },
  };

  getMultipleRandom(arr: any[], num: number) {
    const shuffled = [...arr].sort(
      () => 0.5 - Math.random()
    );

    return shuffled.slice(0, num);
  }

  randomiseArray(arr: any[]) {
    const shuffled = [...arr].sort(
      () => 0.5 - Math.random()
    );

    return shuffled.slice(0, arr.length);
  }

  reset() {
    this.createBoard();
    this.guesses = [];

    this.resetActiveGameState();
    this.count = 0;
    this.correctGuesses = 0;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.createBoard();
  }

  createBoard() {
    // randomise the board.
    const animals = Object.keys(this.animals);

    const randomAnimals = this.getMultipleRandom(
      animals,
      this.numberOfAnimals
    );

    const gameAnimals: any = [];
    const gameState: any = [];

    new Array(this.numberOfAnimals)
      .fill("")
      .forEach((_, index) => {
        gameAnimals.push(
          this.animals[randomAnimals[index]]
        );

        // take two of each animal
        gameState.push(
          {
            name: randomAnimals[index],
            active: false,
            guessed: false,
          },
          {
            name: randomAnimals[index],
            active: false,
            guessed: false,
          }
        );
      }),
      //   console.log({ gameAnimals });
      (this.gameAnimals = gameAnimals);

    // and put them in an array randomly.
    this.gameState = this.randomiseArray(gameState);
  }

  handleCell(index: number) {
    const updatedGameState = [...this.gameState];

    // check if the cell is already active, guessed or the user has used their goes up.

    if (this.guesses.length === 2) {
      this.nextPlayer();
      this.guesses = [];
    }

    if (
      updatedGameState[index].active ||
      updatedGameState[index].guessed
    ) {
      return;
    }
    this.count++;

    updatedGameState[index].active = true;
    this.guesses.push({
      index,
      name: updatedGameState[index].name,
    });

    if (this.guesses.length === 2) {
      if (this.guesses[0].name === this.guesses[1].name) {
        // console.log("we have a match");
        updatedGameState[this.guesses[0].index].guessed =
          true;
        updatedGameState[this.guesses[1].index].guessed =
          true;

        this.correctGuesses++;
        this.resetActiveGameState();
        this.guesses = [];
      } else {
        // console.log("no match");
      }
    }

    this.gameState = updatedGameState;
  }

  nextPlayer() {
    this.guesses = [];
    this.resetActiveGameState();
  }

  resetActiveGameState() {
    let updatedGameState = [...this.gameState];
    updatedGameState.forEach((_, index) => {
      updatedGameState[index].active = false;
    });

    this.gameState = updatedGameState;
  }

  render() {
    return html` <div
      class=${classMap({
        wrapper: true,
        winner:
          this.correctGuesses === this.numberOfAnimals,
      })}
      style=${styleMap({
        "--columns": `${
          this.numberOfAnimals > 4
            ? 3
            : this.numberOfAnimals
        }`,
        "--rows": `${
          this.numberOfAnimals > 4
            ? 3
            : this.numberOfAnimals
        }`,
      })}
    >
      <ah-button @click=${this.reset}>Reset</ah-button>

      ${this.guesses.length === 2
        ? html` <ah-button @click=${this.nextPlayer}>
            Next Player</ah-button
          >`
        : null}

      <div>Number of Moves: ${this.count}</div>

      ${this.showAnimals && this.gameAnimals.length > 0
        ? html`
            <div class="animals">
              ${this.gameAnimals.map((animal) => {
                return html`
                  <img
                    src=${animal.url}
                    width="200"
                    height="200"
                  />
                `;
              })}
            </div>
          `
        : null}
      ${this.gameAnimals.length > 0
        ? html`
            <div class="board">
              ${this.gameState.map((animal, index) => {
                return html`
                  <div
                    class=${classMap({
                      active:
                        animal.active || animal.guessed,
                      guessed: animal.guessed,
                      cell: true,
                    })}
                    @click=${() => this.handleCell(index)}
                  >
                    <img
                      src=${this.animals[animal.name].url}
                      width="100"
                      height="100"
                    />
                  </div>
                `;
              })}
            </div>
          `
        : null}
    </div>`;
  }

  static styles = css`
    .wrapper {
      padding: 1em;
      margin-block: 1em;
      border: 1px solid;
    }

    .animals {
      margin-top: 1em;
    }

    .board {
      display: grid;
      grid-template-columns: repeat(var(--columns), 1fr);
      grid-template-rows: repeat(var(--rows), 1fr);
      gap: 1em;
      margin-top: 1em;
    }

    .cell {
      background: var(--theme-bg, var(--brand));
    }

    .cell img {
      opacity: 0;
    }

    .active img {
      opacity: 1;
      background: transparent;
    }

    .guessed {
      rotate: 180deg;
    }

    img {
      display: block;
    }

    .board img {
      max-width: 100%;
      width: 100%;
      aspect-ratio: 1;
      height: auto;
    }

    .winner {
      background: green;
    }
  `;
}
