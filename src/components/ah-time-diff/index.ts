import dayjs from "dayjs";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-time-diff": AHTimeDiff;
  }
}

/**
 * An ah-button element. A simple button that has a toggleable active state that changes when you click the button.
 * @slot - This element has a slot
 */
@customElement("ah-time-diff")
export class AHTimeDiff extends LitElement {
  @property({ type: Date })
  date = dayjs();

  @property({ type: String })
  targetDateString = "your target date";

  render() {
    const today = dayjs();
    const diff = dayjs(this.date).diff(today, "days");

    const copy =
      diff > 0
        ? html`
            There are
            <strong>${diff}</strong>
            days until ${this.targetDateString}
          `
        : html`
            ${this.targetDateString} was
            <strong>${Math.abs(diff)}</strong> days ago
          `;

    return html`<p>${copy}</p>`;
  }
}
