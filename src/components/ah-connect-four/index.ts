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
    "ah-connect-four": AHConnectFour;
  }
}

/**
 * An ah-connect-four element.
 * @slot - This element has a slot
 */
@customElement("ah-connect-four")
export class AHConnectFour extends LitElement {
  @property({ type: Boolean })
  currentPlayer = false;

  @state()
  gameState = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];

  @state()
  finished = false;

  @state()
  winner = "";

  private winningArrays = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [6, 7, 8, 9],
    [9, 8, 7, 6],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
  ];

  handleColumn(column: number) {
    if (this.finished) {
      alert("already finished");
      return;
    }

    const newGameState = [...this.gameState];

    const array = newGameState[column];
    const foundIndex = array.findIndex(
      (item) => item === null
    );

    if (foundIndex !== -1) {
      // @ts-ignore
      newGameState[column][foundIndex] = this.currentPlayer;
      this.gameState = newGameState;
      this.currentPlayer = !this.currentPlayer;
    }

    this.checkWinner();

    // How to change the first non null item in this.gameState[column] array

    // swap to the other player
  }

  checkWinner() {
    const flattenedGameState = this.gameState.flat();

    console.log(flattenedGameState);

    for (let y = 0; y < this.winningArrays.length; y++) {
      const square1 =
        flattenedGameState[this.winningArrays[y][0]];
      const square2 =
        flattenedGameState[this.winningArrays[y][1]];
      const square3 =
        flattenedGameState[this.winningArrays[y][2]];
      const square4 =
        flattenedGameState[this.winningArrays[y][3]];

      // //check those squares to see if they all have the class of player-one
      if (
        square1 === true &&
        square2 === true &&
        square3 === true &&
        square4 === true
      ) {
        this.winner = "yellow";
        this.finished = true;
      }
      //check those squares to see if they all have the class of player-two
      if (
        square1 === false &&
        square2 === false &&
        square3 === false &&
        square4 === false
      ) {
        this.winner = "red";
        this.finished = true;
      }
    }
  }

  resetBoard() {
    this.gameState = [
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];
    this.finished = false;
    this.winner = "";
  }

  render() {
    return html` <ah-heading>Current Player</ah-heading>
      <div class="info">
        <ah-button @click=${this.resetBoard}
          >Reset</ah-button
        >
        ${this.finished
          ? html`
              <ah-heading variant="h3"
                >Winning Color</ah-heading
              >
              <div
                class=${classMap({
                  nextCell: true,
                  cell: true,
                  red: this.winner === "red",
                  yellow: this.winner === "yellow",
                })}
              ></div>
            `
          : html`
              <ah-heading variant="h3"
                >Current Color</ah-heading
              >
              <div
                class=${classMap({
                  nextCell: true,
                  cell: true,
                  red: this.currentPlayer === false,
                  yellow: this.currentPlayer === true,
                })}
              ></div>
            `}
      </div>
      <div
        class="board"
        style=${styleMap({
          "--current-color": this.currentPlayer
            ? "yellow"
            : "red",
        })}
      >
        ${[...new Array(3)].map((_, column) => {
          return html`
            <div
              class="column"
              @click=${() => this.handleColumn(column)}
            >
              <div
                class=${classMap({
                  cell: true,
                  red: this.gameState[column][5] === false,
                  yellow:
                    this.gameState[column][5] === true,
                })}
              ></div>
              <div
                class=${classMap({
                  cell: true,
                  red: this.gameState[column][4] === false,
                  yellow:
                    this.gameState[column][4] === true,
                })}
              ></div>
              <div
                class=${classMap({
                  cell: true,
                  red: this.gameState[column][3] === false,
                  yellow:
                    this.gameState[column][3] === true,
                })}
              ></div>
              <div
                class=${classMap({
                  cell: true,
                  red: this.gameState[column][2] === false,
                  yellow:
                    this.gameState[column][2] === true,
                })}
              ></div>
              <div
                class=${classMap({
                  cell: true,
                  red: this.gameState[column][1] === false,
                  yellow:
                    this.gameState[column][1] === true,
                })}
              ></div>
              <div
                class=${classMap({
                  cell: true,
                  red: this.gameState[column][0] === false,
                  yellow:
                    this.gameState[column][0] === true,
                })}
              ></div>
            </div>
          `;
        })}
      </div>`;
  }

  static styles = css`
    :host {
      --size: 50;
    }

    .info {
      display: inline-block;
      padding-right: 1em;
      float: left;
    }

    .board {
      margin: 2em 0;
      display: grid;
      grid-template-columns: repeat(
        7,
        calc(var(--size) * 1px)
      );
      gap: 1em;
      background: blue;
      padding-left: 1em;
      width: calc(calc(calc(var(--size) * 1px) + 1em) * 7);
    }

    .column {
      width: calc(var(--size) * 1px);
    }

    .column:hover .cell:not(.red):not(.yellow) {
      background: var(--current-color);
    }

    .cell {
      border-radius: 50%;
      background: white;
      width: calc(var(--size) * 1px);
      margin-block: 0.5em;
      aspect-ratio: 1;
      border: 1px solid black;
    }

    .red {
      background: red;
    }

    .yellow {
      background: yellow;
    }
  `;
}
