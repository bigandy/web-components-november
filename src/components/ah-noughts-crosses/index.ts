import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import {
  NAUGHT_ICON,
  CROSS_ICON,
} from "../../constants/icons";

declare global {
  interface HTMLElementTagNameMap {
    "ah-noughts-crosses": AHNoughtsCrosses;
  }
}

const initialBoardState: any = {
  0: undefined,
  1: undefined,
  2: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  6: undefined,
  7: undefined,
  8: undefined,
  9: undefined,
};

const winningArrays = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * An ah-noughts-crosses element. A simple button that has a toggleable active state that changes when you click the button.
 */
@customElement("ah-noughts-crosses")
export class AHNoughtsCrosses extends LitElement {
  static styles = css`
    .board {
      width: 400px;
      aspect-ratio: 1;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 0.3em;
    }

    input {
      display: none;
    }

    label {
      place-content: center;
      display: grid;
      border: 1px solid;
    }

    .nextPlayer {
      place-content: center;
      display: grid;
      width: 75px;
      aspect-ratio: 1;
      margin-bottom: 1em;
    }

    .naught {
      background: var(
        --ah-noughts-crosses-naught-background,
        yellow
      );
      fill: var(--ah-noughts-crosses-naught-fill, green);
    }

    .cross {
      background: var(
        --ah-noughts-crosses-cross-background,
        purple
      );
      fill: var(--ah-noughts-crosses-cross-fill, yellow);
    }

    .noGoCell {
      cursor: not-allowed;
      pointer-events: none;
    }

    ah-button {
      margin-top: 1em;
      display: inline-block;
      --ah-button-background: red;
      --ah-button-background-hover: cyan;
      color: white;
    }
  `;

  @state()
  boardState = initialBoardState;

  @state()
  firstPlayerActive: boolean = true;

  @state()
  winner: boolean = false;

  handleInputChange(index: number) {
    if (
      this.boardState[index] === undefined &&
      !this.winner
    ) {
      const updatedState = { ...this.boardState };
      updatedState[index] = this.firstPlayerActive;
      this.boardState = updatedState;

      this.calculateIfWinner();
      this.firstPlayerActive = !this.firstPlayerActive;
    }
  }

  renderIcon(index: number) {
    if (this.boardState[index] === undefined) {
      return null;
    } else if (this.boardState[index]) {
      return NAUGHT_ICON;
    } else {
      return CROSS_ICON;
    }
  }

  resetBoard() {
    this.boardState = initialBoardState;
    this.winner = false;
  }

  calculateIfWinner() {
    winningArrays.forEach((array) => {
      const trueCount = array.every((number) => {
        return this.boardState[number] === true;
      });

      const falseCount = array.every((number) => {
        return this.boardState[number] === false;
      });
      if (falseCount || trueCount) {
        this.winner = true;
      }
    });
  }

  render() {
    return html`
      <div class="current">
        ${!this.winner
          ? html`<ah-heading variant="h3"
              >Current:
              ${this.firstPlayerActive
                ? "Naught"
                : "Cross"}</ah-heading
            >`
          : ""}
        ${this.winner
          ? html`<ah-heading variant="h3"
              >winner winner chicken dinner:
              ${!this.firstPlayerActive
                ? "Naught"
                : "Cross"}
              wins</ah-heading
            >`
          : html`<div
              class=${classMap({
                nextPlayer: true,
                naught: this.firstPlayerActive,
                cross: !this.firstPlayerActive,
              })}
            >
              ${this.firstPlayerActive
                ? NAUGHT_ICON
                : CROSS_ICON}
            </div>`}
      </div>
      <div class="board">
        ${[...Array(9)].map((_, index) => {
          return html`<input
              type="checkbox"
              id=${`checkbox-${index}`}
              ?checked=${this.boardState[index] !==
              undefined}
              @change=${() => this.handleInputChange(index)}
              class=${classMap({
                noGoCell:
                  this.boardState[index] !== undefined ||
                  this.winner,
              })}
            />
            <label
              for=${`checkbox-${index}`}
              class=${classMap({
                naught: this.boardState[index] === true,
                cross: this.boardState[index] === false,
              })}
            >
              ${this.renderIcon(index)}
            </label> `;
        })}
      </div>
      <ah-button @click=${this.resetBoard}>Reset</ah-button>
    `;
  }
}
