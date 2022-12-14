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
  time = 0;

  @state()
  playing = false;

  private interval: number | undefined = undefined;

  static styles = css``;

  handlePause() {
    console.log("handle pause", this.playing);

    if (this.playing) {
      clearInterval(this.interval);
    } else {
      this.createInterval();
    }
    this.playing = !this.playing;
  }

  createInterval() {
    this.interval = setInterval(() => this.time++, 100);
  }

  handleStart() {
    console.log("handle start");

    this.createInterval();
    this.playing = true;
  }

  handleStop() {
    console.log("handle stop");

    clearInterval(this.interval);
    this.playing = false;
  }

  handleReset() {
    if (this.playing) {
      clearInterval(this.interval);
      this.playing = false;
    }

    this.time = 0;
  }

  render() {
    return html`
      <div class="display">${this.time}</div>
      ${!this.playing
        ? html`<button @click=${this.handleStart}>
            Start
          </button>`
        : html`<button @click=${this.handleStop}>
            Stop
          </button>`}

      <button @click=${this.handlePause}>Pause</button>
      <button @click=${this.handleReset}>Reset</button>
    `;
  }
}
