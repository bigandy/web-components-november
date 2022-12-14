import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-stopwatch-advanced": AHStopwatchAdvanced;
  }
}
/**
 * An ah-stopwatch-advanced element.
 */
@customElement("ah-stopwatch-advanced")
export class AHStopwatchAdvanced extends LitElement {
  @state()
  time = 0;

  @state()
  playing = false;

  private interval: number | undefined = undefined;

  static styles = css`
    ah-button {
      --ah-button-border-radius: 0;
      --ah-button-background: black;
      --ah-button-color: white;
      --ah-button-background-hover: grey;
      margin-right: 1em;
    }
    .display {
      font-size: 100px;
      display: flex;
      margin-block: 1rem;
    }
  `;

  handlePause() {
    if (this.playing) {
      clearInterval(this.interval);
    } else {
      this.createInterval();
    }
    this.playing = !this.playing;
  }

  createInterval() {
    this.interval = window.setInterval(() => this.time++, 1000);
  }

  handleStart() {
    this.createInterval();
    this.playing = true;
  }

  handleStop() {
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

  convertTimetoSeconds(time: number) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    const ones = seconds % 10;

    const tens = Math.floor(seconds / 10);

    return [tens % 60, ones];
  }

  convertTimetoMinutes(time: number) {
    var minutes = Math.floor((time % 3600) / 60);

    const ones = minutes % 10;

    const tens = Math.floor(minutes / 10);

    return [tens % 60, ones];
  }

  convertTimetoHours(time: number) {
    var hours = Math.floor(time / 3600);

    const ones = hours % 10;

    const tens = Math.floor(hours / 10);

    return [tens % 60, ones];
  }

  display() {
    const minutes = this.convertTimetoMinutes(this.time);
    const seconds = this.convertTimetoSeconds(this.time);
    const hours = this.convertTimetoHours(this.time);

    const internalMinutes = minutes.map((digit) => {
      return html`<ah-digit .number=${digit}></ah-digit>`;
    });

    const internalSeconds = seconds.map((digit) => {
      return html`<ah-digit .number=${digit}></ah-digit>`;
    });

    const internalHours = hours.map((digit) => {
      return html`<ah-digit .number=${digit}></ah-digit>`;
    });

    return html`<div class="display">
      ${internalHours}:${internalMinutes}:${internalSeconds}
    </div>`;
  }

  render() {
    return html`
      ${this.display()}
      ${!this.playing
        ? html`<ah-button @click=${this.handleStart}>Start</ah-button>`
        : html`<ah-button @click=${this.handleStop}>Stop</ah-button>`}

      <ah-button @click=${this.handlePause}>Pause</ah-button>
      <ah-button @click=${this.handleReset}>Reset</ah-button>
    `;
  }
}
