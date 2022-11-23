import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

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
  gameState = this.deepClone(initialGameState);

  @state()
  finished = false;

  @state()
  winner = "";

  handleColumn(column: number) {
    if (this.finished) {
      alert("already finished");
      return;
    }

    const newGameState = [...this.gameState];

    const array = newGameState[column];
    const foundIndex = array.findIndex((item: any) => item === null);

    if (foundIndex !== -1) {
      // @ts-ignore
      newGameState[column][foundIndex] = this.currentPlayer ? "yellow" : "red";
      this.gameState = newGameState;
      this.currentPlayer = !this.currentPlayer;
    }

    const winner = this.checkForWinner();

    if (winner) {
      this.winner = winner;
      this.finished = true;
    }
  }

  // code originally here: https://frontendeval.com/utils/connectFour.js
  checkForWinner() {
    const board = this.gameState;

    const NUM_IN_ROW_WIN = 4;
    const checkVerticalWinner = (board: any) => {
      for (let x = 0; x < board.length; x++) {
        let maxNumInRow = 1;
        let lastToken = board[x][0];
        for (let y = 1; y < board[x].length; y++) {
          const currentToken = board[x][y];

          if (currentToken === lastToken && currentToken !== null) {
            maxNumInRow++;
            if (maxNumInRow === NUM_IN_ROW_WIN) {
              return currentToken;
            }
          } else {
            maxNumInRow = 1;
          }
          lastToken = currentToken;
        }
      }

      return null;
    };

    const checkHorizontalWinner = (board: any) => {
      for (let y = 0; y < board[0].length; y++) {
        let maxNumInRow = 1;
        let lastToken = board[0][y];
        for (let x = 1; x < board.length; x++) {
          const currentToken = board[x][y];
          if (currentToken === lastToken && currentToken !== null) {
            maxNumInRow++;
            if (maxNumInRow === NUM_IN_ROW_WIN) {
              return currentToken;
            }
          } else {
            maxNumInRow = 1;
          }
          lastToken = currentToken;
        }
      }

      return null;
    };

    const checkDiagonalWinner = (board: any) => {
      for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
          const currentToken = board[x][y];

          if (
            currentToken !== null &&
            ((x < board.length - 3 &&
              y < board[x].length - 3 &&
              currentToken === board[x + 1][y + 1] &&
              currentToken === board[x + 2][y + 2] &&
              currentToken === board[x + 3][y + 3]) ||
              (x >= 3 &&
                currentToken === board[x - 1][y + 1] &&
                currentToken === board[x - 2][y + 2] &&
                currentToken === board[x - 3][y + 3]))
          ) {
            return currentToken;
          }
        }
      }

      return null;
    };

    return (
      checkVerticalWinner(board) ||
      checkHorizontalWinner(board) ||
      checkDiagonalWinner(board)
    );
  }

  resetBoard() {
    this.gameState = this.deepClone(initialGameState);
    this.finished = false;
    this.winner = "";
    this.currentPlayer = false;
  }

  deepClone(arr: any) {
    return JSON.parse(JSON.stringify(arr));
  }

  render() {
    return html` <div class="info">
        <ah-heading variant="h3"
          >${this.finished ? "Winning Color" : "Current Color"}<span
            class=${classMap({
              nextCell: true,
              cell: true,
              red: this.finished
                ? this.winner === "red"
                : this.currentPlayer === false,
              yellow: this.finished
                ? this.winner === "yellow"
                : this.currentPlayer === true,
            })}
            style="--size: 20; display: inline-block; vertical-align: -12px; margin-left: 5px;"
          ></span
        ></ah-heading>

        <ah-button @click=${this.resetBoard}>Reset</ah-button>
      </div>
      <div
        class=${classMap({
          board: true,
          finishedBoard: this.finished,
        })}
        style=${styleMap({
          "--current-color": this.currentPlayer ? "yellow" : "red",
        })}
      >
        ${[...new Array(7)].map((_, column) => {
          return html`
            <div class="column" @click=${() => this.handleColumn(column)}>
              <div
                class=${classMap({
                  cell: true,
                  red: this.gameState[column][5] === "red",
                  yellow: this.gameState[column][5] === "yellow",
                })}
              ></div>
              <div
                class=${classMap({
                  cell: true,
                  red: this.gameState[column][4] === "red",
                  yellow: this.gameState[column][4] === "yellow",
                })}
              ></div>
              <div
                class=${classMap({
                  cell: true,
                  red: this.gameState[column][3] === "red",
                  yellow: this.gameState[column][3] === "yellow",
                })}
              ></div>
              <div
                class=${classMap({
                  cell: true,
                  red: this.gameState[column][2] === "red",
                  yellow: this.gameState[column][2] === "yellow",
                })}
              ></div>
              <div
                class=${classMap({
                  cell: true,
                  red: this.gameState[column][1] === "red",
                  yellow: this.gameState[column][1] === "yellow",
                })}
              ></div>
              <div
                class=${classMap({
                  cell: true,
                  red: this.gameState[column][0] === "red",
                  yellow: this.gameState[column][0] === "yellow",
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

    ah-heading {
      display: inline-block;
    }

    ah-button {
      margin-left: 1em;
    }

    .board {
      display: grid;
      grid-template-columns: repeat(7, calc(var(--size) * 1px));
      gap: 1em;
      background: blue;
      padding-left: 1em;
      width: calc(calc(calc(var(--size) * 1px) + 1em) * 7);
    }

    .finishedBoard {
      pointer-events: none;
      background: black;
    }

    .column {
      width: calc(var(--size) * 1px);
    }

    /* thanks to https://www.youtube.com/watch?v=uuluAyw9AI0&ab_channel=KevinPowell */
    @media (hover: hover) {
      .board:not(.boardFinished) .column:hover .cell:not(.red):not(.yellow) {
        background: var(--current-color);
      }
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

    @media (max-width: 600px) {
      :host {
        --size: 25;
      }
      .info {
        width: 100%;
        margin-bottom: 1em;
      }
    }
  `;
}
