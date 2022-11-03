import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-noughts-crosses": AHNoughtsCrosses;
  }
}

const NAUGHT_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"/></svg>';

const CROSS_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>';

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

    input:checked + label {
      background: red;
    }

    label {
      background: green;
    }
  `;

  // constructor() {
  //   super();

  //   // this.addEventListener("click", this.handleClick);
  // }

  // handleClick(e) {
  //   console.log("clicked", e);
  // }

  @state()
  boardState: boolean[] = [...Array(9).map(() => false)];

  @property()
  count: number = 0;

  handleInputChange(index: number) {
    const updatedState = [...this.boardState];
    updatedState[index] = !updatedState[index];
    this.boardState = updatedState;

    this.count = updatedState.filter(Boolean).length;
  }

  render() {
    return html`
      <div class="board">
        ${[...Array(9)].map((_, index) => {
          return html`<input
              type="checkbox"
              id=${`checkbox-${index}`}
              ?checked=${this.boardState[index]}
              @change=${() => this.handleInputChange(index)}
            />
            <label for=${`checkbox-${index}`}></label> `;
        })}
      </div>
      <output>${this.count}</output>
    `;
  }
}
