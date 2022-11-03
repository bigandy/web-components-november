import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-noughts-crosses": AHNoughtsCrosses;
  }
}

const NAUGHT_ICON = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  height="48"
  width="48"
>
  <path
    d="M24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"
  />
</svg>`;

const CROSS_ICON = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  height="48"
  width="48"
>
  <path
    d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"
  />
</svg>`;

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
      background: var(--ah-noughts-crosses-naught-background, yellow);
      fill: var(--ah-noughts-crosses-naught-fill, green);
    }

    .cross {
      background: var(--ah-noughts-crosses-cross-background, purple);
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
    if (this.boardState[index] === undefined && !this.winner) {
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
              ${this.firstPlayerActive ? "Naught" : "Cross"}</ah-heading
            >`
          : ""}
        ${this.winner
          ? html`<ah-heading variant="h3"
              >winner winner chicken dinner:
              ${!this.firstPlayerActive ? "Naught" : "Cross"} wins</ah-heading
            >`
          : html`<div
              class=${classMap({
                nextPlayer: true,
                naught: this.firstPlayerActive,
                cross: !this.firstPlayerActive,
              })}
            >
              ${this.firstPlayerActive ? NAUGHT_ICON : CROSS_ICON}
            </div>`}
      </div>
      <div class="board">
        ${[...Array(9)].map((_, index) => {
          return html`<input
              type="checkbox"
              id=${`checkbox-${index}`}
              ?checked=${this.boardState[index] !== undefined}
              @change=${() => this.handleInputChange(index)}
              class=${classMap({
                noGoCell: this.boardState[index] !== undefined || this.winner,
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
