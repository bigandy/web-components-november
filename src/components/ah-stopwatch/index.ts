import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-stopwatch": AHStopwatch;
  }
}
/**
 * An ah-stopwatch element.
 */
@customElement("ah-stopwatch")
export class AHStopwatch extends LitElement {
  @state()
  time = "";

  static styles = css``;

  handlePause() {
    console.log("handle pause");
  }

  handleStart() {
    console.log("handle start");
  }

  handleStop() {
    console.log("handle stop");
  }

  render() {
    return html`
      <div class="display">${this.time}</div>
      <button @click=${this.handleStart}>Start</button>
      <button @click=${this.handleStop}>Stop</button>
      <button @click=${this.handlePause}>Pause</button>
    `;
  }
}
