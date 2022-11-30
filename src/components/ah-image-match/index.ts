import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

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
  numberOfAnimals = 10; // 1 - 12 currently

  @property({ type: String })
  level: "easy" | "medium" | "hard" = "easy";

  private numberEachAnimal = 2;

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
    monkey: {
      url: "https://images.unsplash.com/photo-1605559911160-a3d95d213904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1311&q=80",
    },
    unicorn: {
      url: "https://images.unsplash.com/photo-1550747528-cdb45925b3f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80",
    },
    tiger: {
      url: "https://images.unsplash.com/photo-1615963244664-5b845b2025ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2636&q=80",
    },
    flamingo: {
      url: "https://images.unsplash.com/photo-1497206365907-f5e630693df0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80",
    },
    zebra: {
      url: "https://images.unsplash.com/photo-1501706362039-c06b2d715385?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1820&q=80",
    },
    toucan: {
      url: "https://images.unsplash.com/photo-1550853024-fae8cd4be47f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80",
    },
    frog: {
      url: "https://images.unsplash.com/photo-1586769203201-3f12adc567a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1833&q=80",
    },
  };

  getMultipleRandom(arr: any[], num: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }

  randomiseArray(arr: any[]) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

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

    if (this.level === "easy") {
      this.numberEachAnimal = 2;
    } else if (this.level === "medium") {
      this.numberEachAnimal = 3;
    } else {
      this.numberEachAnimal = 4;
    }

    this.createBoard();
  }

  createBoard() {
    // randomise the board.
    const animals = Object.keys(this.animals);

    const randomAnimals = this.getMultipleRandom(animals, this.numberOfAnimals);

    const gameAnimals: any = [];
    const gameState: any = [];

    new Array(this.numberOfAnimals).fill("").forEach((_, index) => {
      gameAnimals.push(this.animals[randomAnimals[index]]);

      // take x of each animal

      const toAdd = new Array(this.numberEachAnimal).fill("").map(() => {
        return {
          name: randomAnimals[index],
          active: false,
          guessed: false,
        };
      });

      gameState.push(...toAdd);
    });
    //   console.log({ gameAnimals });
    this.gameAnimals = gameAnimals;

    // and put them in an array randomly.
    this.gameState = this.randomiseArray(gameState);
  }

  handleCell(index: number) {
    const updatedGameState = [...this.gameState];
    const name = updatedGameState[index].name;

    // check if the cell is already active, guessed or the user has used their goes up.

    if (this.guesses.length === this.numberEachAnimal) {
      this.nextPlayer();
      this.guesses = [];
    }

    if (updatedGameState[index].active || updatedGameState[index].guessed) {
      return;
    }
    this.count++;

    updatedGameState[index].active = true;
    this.guesses.push({
      index,
      name,
    });

    if (this.guesses.length === this.numberEachAnimal) {
      if (this.guesses.every((v) => v.name === name)) {
        // console.log("we have a match");

        this.guesses.forEach((_, index) => {
          updatedGameState[this.guesses[index].index].guessed = true;
        });

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

  handleSwitch(e: any) {
    this.showAnimals = e.detail.state;
  }

  render() {
    return html` <div
      class=${classMap({
        wrapper: true,
        winner: this.correctGuesses === this.numberOfAnimals,
      })}
      @switch=${this.handleSwitch}
    >
      <div>
        <ah-header variant="h3">Level: ${this.level}</ah-header>
        <p>
          You need to find ${this.numberEachAnimal} of a kind to get a match
        </p>
      </div>
      <ah-button @click=${this.reset}>Reset</ah-button>

      <ah-switch
        onLabel="Show Animals"
        offLabel="Hide Animals"
        ?on=${!this.showAnimals}
      ></ah-switch>

      ${this.guesses.length === this.numberEachAnimal
        ? html` <ah-button @click=${this.nextPlayer}> Next Player</ah-button>`
        : null}

      <div>Number of Moves: ${this.count}</div>

      ${this.showAnimals && this.gameAnimals.length > 0
        ? html`
            <div class="animals">
              ${this.gameAnimals.map((animal) => {
                return html`
                  <img src=${animal.url} width="200" height="200" />
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
                      active: animal.active || animal.guessed,
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
      display: flex;
      overflow: scroll;
      gap: 0.5em;
    }

    .animals img {
      display: inline-block;
    }

    .board {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
      margin-top: 1em;
    }

    .cell {
      width: 100px;
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
      pointer-events: none;
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
