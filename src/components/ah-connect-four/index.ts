import { LitElement, css, html } from "lit";
import {
  customElement,
  property,
  state,
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-connect-four": AHConnectFour;
  }
}

const initialGameState = [
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
];

/**
 * An ah-connect-four element.
 * @slot - This element has a slot
 */
@customElement("ah-connect-four")
export class AHConnectFour extends LitElement {
  @property({ type: Boolean })
  currentPlayer = false;

  @state()
  gameState = initialGameState;

  handleColumn(column: number) {
    // console.log(column, this.gameState[column]);

    const newGameState = [...this.gameState];

    const array = newGameState[column];
    const foundIndex = array.findIndex(
      (item) => item === null
    );

    if (foundIndex === -1) {
      // the first item
      //   newGameState[column][0] = this.currentPlayer;
    } else {
      newGameState[column][foundIndex] = this.currentPlayer;
    }

    // How to change the first non null item in this.gameState[column] array

    // swap to the other player
    this.currentPlayer = !this.currentPlayer;
  }

  resetBoard() {
    console.log("reset board please");
    this.gameState = initialGameState;
  }

  render() {
    return html` <ah-button @click=${this.resetBoard}
        >Reset</ah-button
      >
      <div class="board">
        ${[...new Array(7)].map((_, column) => {
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
    .board {
      margin: 2em auto;
      display: grid;
      grid-template-columns: repeat(7, 100px);
      gap: 1em;
      background: blue;
      padding-left: 1em;
      width: calc(calc(100px + 1em) * 7);
    }

    .column {
      width: 100px;
    }

    .column:hover .cell:not(.red):not(.yellow) {
      background: grey;
    }

    .cell {
      border-radius: 50%;
      background: white;
      width: 100px;
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
