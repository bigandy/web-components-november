import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
declare global {
  interface HTMLElementTagNameMap {
    "ah-snap": AHSnap;
  }
}

/**
 * An ah-snap element.
 */
@customElement("ah-snap")
export class AHSnap extends LitElement {
  @state()
  count = 0;

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
  correctGuesses = 0;

  private numberOfAnimals = 3; // 1 - 5 currently

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

  start() {
    this.createBoard();
    this.guesses = [];

    this.resetActiveGameState();
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

    // reset the count to zero
    this.count = 0;
  }

  handleCell(index: number) {
    const updatedGameState = [...this.gameState];

    // check if the cell is already active, guessed or the user has used their goes up.
    if (
      updatedGameState[index].active ||
      updatedGameState[index].guessed ||
      this.guesses.length === 2
    ) {
      return;
    }

    updatedGameState[index].active = true;
    this.guesses.push({
      index,
      name: updatedGameState[index].name,
    });

    console.log(this.guesses);
    if (this.guesses.length === 2) {
      //   console.log("check the guesses");
      if (this.guesses[0].name === this.guesses[1].name) {
        console.log("we have a match");
        updatedGameState[this.guesses[0].index].guessed =
          true;
        updatedGameState[this.guesses[1].index].guessed =
          true;

        this.correctGuesses++;
        this.resetActiveGameState();
        this.guesses = [];
      } else {
        console.log("no match");

        // this.nextPlayer();
      }
    }

    this.gameState = updatedGameState;
  }

  nextPlayer() {
    this.guesses = [];
    this.count++;

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
        winner:
          this.correctGuesses === this.numberOfAnimals,
      })}
    >
      <ah-button @click=${this.start}>Reset</ah-button>

      ${this.correctGuesses !== this.numberOfAnimals &&
      this.guesses.length === 2
        ? html` <ah-button @click=${this.nextPlayer}>
            Next Player</ah-button
          >`
        : null}
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
    .animals {
      margin-top: 1em;
    }

    .board {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 1em;
      margin-top: 1em;
    }

    .cell {
      background: var(--theme-bg);
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
      border: 20px solid green;
    }
  `;
}
