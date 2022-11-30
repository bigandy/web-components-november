import { LitElement, html, css } from "lit";
import { customElement, state, property } from "lit/decorators.js";

import { classMap } from "lit/directives/class-map.js";

import switchOnMp3 from "../../assets/sounds/stories_sounds_switch-on.mp3";
import switchOffMp3 from "../../assets/sounds/stories_sounds_switch-off.mp3";

declare global {
  interface HTMLElementTagNameMap {
    "ah-switch": AHSwitch;
  }
}
/**
 * An ah-house element.
 */
@customElement("ah-switch")
export class AHSwitch extends LitElement {
  @state()
  on = false;

  @property({ type: String })
  ref = "";

  @property({ type: Boolean })
  fullWidth = false;

  @property({ type: Boolean })
  hideLabel = false;

  @property({ type: Boolean })
  muted = false;

  @property({ type: String })
  onLabel = "On";

  @property({ type: String })
  offLabel = "Off";

  private initialized = false;
  private audioCtx: AudioContext | null = null;

  static styles = css`
    .switch {
      position: relative;
    }

    ah-button {
      --ah-button-padding-inline: 30px;
    }

    .switch::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;

      height: 100%;
      aspect-ratio: 1;
      border-radius: 50%;

      left: 4px;
      transform: translateX(0);
      background: white;
    }

    .on {
      --ah-button-background: green;
      --ah-button-background-hover: darkgreen;
    }

    .on::after {
      left: calc(100% - 4px);
      transform: translateX(-100%);
    }

    .off {
      --ah-button-background: red;
      --ah-button-background-hover: darkred;
    }
  `;

  handleSound() {
    this._initializeAudio();
    if (this.audioCtx && !this.muted) {
      this.play(this.on ? switchOnMp3 : switchOffMp3);
    }
  }

  private _initializeAudio() {
    if (this.initialized || this.muted) {
      return;
    }
    this.initialized = true;
    this.audioCtx = new AudioContext();
  }

  async play(url: string) {
    if (this.audioCtx && !this.muted) {
      const buffer = await fetch(url)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => this.audioCtx?.decodeAudioData(arrayBuffer));

      if (buffer) {
        const source = this.audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioCtx.destination);
        source.start();
      }
    }
  }

  handleToggle() {
    this.on = !this.on;
    // emit custom event

    this.dispatchEvent(
      new CustomEvent("switch", {
        detail: {
          state: this.on,
          ref: this.ref,
        },
        bubbles: true,
      })
    );
    if (!this.muted) {
      this.handleSound();
    }
  }

  render() {
    return html`
      <ah-button
        ?fullwidth=${this.fullWidth}
        @click=${this.handleToggle}
        class=${classMap({
          switch: true,
          on: this.on,
          off: !this.on,
        })}
        >${!this.hideLabel
          ? this.on
            ? this.onLabel
            : this.offLabel
          : ""}</ah-button
      >
    `;
  }
}
