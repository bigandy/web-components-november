import dayjs from "dayjs";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-time-until": AHTimeUntil;
  }
}

/**
 * An ah-button element. A simple button that has a toggleable active state that changes when you click the button.
 * @slot - This element has a slot
 */
@customElement("ah-time-until")
export class AHTimeUntil extends LitElement {
  @property({ type: Date })
  date = dayjs();

  @property({ type: Boolean })
  days = false;

  @property({ type: String })
  targetDateString = "your target date";

  render() {
    const today = dayjs();

    console.log(this.date);

    return html`
      <div>
        There are
        <strong
          >${Math.abs(
            today.diff(this.date, "days")
          )}</strong
        >
        days until ${this.targetDateString}
      </div>
    `;
  }

  static styles = css`
    table {
      width: 100%;
    }
    table,
    th,
    td {
      border: 1px solid black;
      border-collapse: collapse;
      padding: 0.5em;
    }
  `;
}
