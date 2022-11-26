import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";

const localStorageKey = "wcn2022-habit";

declare global {
  interface HTMLElementTagNameMap {
    "ah-habit-tracker": AHHabitTracker;
  }
}

/**
 * A ah-habit-tracker element.
 */
@customElement("ah-habit-tracker")
export class AHHabitTracker extends LitElement {
  @property({ type: Number })
  columns = 9;

  @property({ type: Number })
  rows = 10;

  @state()
  trackerState: Boolean[] = [];

  connectedCallback() {
    super.connectedCallback();

    const storage = localStorage.getItem(localStorageKey);

    const storageArray = storage && storage !== "" && JSON.parse(storage);

    if (Array.isArray(storageArray)) {
      this.trackerState = storageArray;
    } else {
      this.trackerState = [...new Array(this.rows * this.columns).fill(false)];
    }
  }

  handleCellClick(i: number) {
    console.log(i);
    const newState = [...this.trackerState];
    newState[i] = !newState[i];

    this.trackerState = newState;

    this.save(this.trackerState);
  }

  save(state: Boolean[]) {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }

  render() {
    return html`<ah-heading variant="h1">
        Habit
        <span>
          <span id="maxCells"
            >${this.trackerState.filter(Boolean).length} /
            ${this.trackerState.length}</span
          ></span
        >
        Tracker
      </ah-heading>

      <div
        class="grid"
        style=${styleMap({
          "--cols": `${this.columns}`,
          "--rows": `${this.rows}`,
        })}
      >
        ${this.trackerState.map((cell, index) => {
          return html`<div
            class=${classMap({
              cell: true,
              active: Boolean(cell),
            })}
            @click=${() => this.handleCellClick(index)}
          ></div>`;
        })}
      </div> `;
  }

  static styles = css`
    ah-heading {
      margin-bottom: 50px;
    }

    ah-heading span {
      color: var(--brand);
    }

    .grid {
      padding-left: 1em;
      padding-right: 1em;
      padding-left: 1em;
      padding-right: 1em;
      display: grid;
      grid-template-columns: repeat(var(--cols), 50px);
      grid-template-rows: repeat(var(--rows), 50px);
      grid-gap: 1em;
      padding-bottom: 100px;
    }

    .cell {
      border: 1px solid black;
      cursor: pointer;
      position: relative;
    }

    input {
      margin-bottom: 1em;
    }

    .grid-controls {
      position: absolute;
      width: 100%;
      text-align: center;
    }

    .active::before,
    .active::after {
      transform: rotate(45deg);
      height: 90%;
      width: 3px;
      content: "";
      display: block;
      background-color: var(--ah-habit-tracker-cross-bg, var(--brand, red));
      top: calc(5% - 1px);
      left: calc(50% - 1px);
      position: absolute;
    }

    .active::after {
      transform: rotate(-45deg);
    }

    @media print {
      h1 span,
      .grid-controls {
        display: none;
      }

      .active {
        border-color: black;
        background-color: transparent;
      }

      .active::before,
      .active::after {
        background-color: black;
      }
    }
  `;
}
