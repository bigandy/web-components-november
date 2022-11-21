import { LitElement, html, css } from "lit";
import {
  customElement,
  state,
  property,
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import {
  LIGHT_ICON,
  DARK_ICON,
} from "../../constants/icons";

import switchOnMp3 from "../../assets/sounds/stories_sounds_switch-on.mp3";
import switchOffMp3 from "../../assets/sounds/stories_sounds_switch-off.mp3";

declare global {
  interface HTMLElementTagNameMap {
    "ah-house": AHHouse;
    "ah-light": AHLight;
    "ah-switch": AHSwitch;
    "ah-room": AHRoom;
  }
}

/**
 * An ah-house element.
 * @slot - This element has a slot
 */
@customElement("ah-house")
export class AHHouse extends LitElement {
  @state()
  lights = {
    main: false,
    kitchen: false,
    bedroom: false,
    lounge: false,
  };

  static styles = css`
    :host {
      position: relative;
    }

    .roof {
      position: absolute;
      top: -100px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 200px 100px 200px;
      border-color: transparent transparent #007bff
        transparent;
    }

    .house {
      box-sizing: border-box;
      padding: 1em;
      margin-top: 100px;
      height: 250px;
      width: 400px;
      background: black;
      position: relative;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1em;
    }

    ah-light {
      color: white;
    }

    .controls {
      position: absolute;
      top: 0;
      left: calc(100% + 1em);
    }

    .controls {
      width: 400px;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  `;

  handleSwitch(e: any) {
    const newState = { ...this.lights };
    // @ts-ignore
    newState[e.detail.room] = e.detail.state;
    this.lights = newState;
  }

  render() {
    return html`
      <div
        class=${classMap({
          house: true,
        })}
        @switch=${this.handleSwitch}
      >
        <div class="roof"></div>
        <ah-room room="main" .on=${this.lights.main}>
        </ah-room>

        <ah-room room="kitchen" .on=${this.lights.kitchen}>
        </ah-room>

        <ah-room room="bedroom" .on=${this.lights.bedroom}>
        </ah-room>

        <ah-room room="lounge" .on=${this.lights.lounge}>
        </ah-room>

        <div class="controls">
          <h3>Main Room</h3>
          <ah-switch
            .on=${this.lights.main}
            room="main"
          ></ah-switch>

          <h3>kitchen Room</h3>
          <ah-switch
            .on=${this.lights.kitchen}
            room="kitchen"
          ></ah-switch>

          <h3>bedroom Room</h3>
          <ah-switch
            .on=${this.lights.bedroom}
            room="bedroom"
          ></ah-switch>

          <h3>lounge Room</h3>
          <ah-switch
            .on=${this.lights.lounge}
            room="lounge"
          ></ah-switch>
        </div>
      </div>
    `;
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
  room = "";

  private initialized = false;
  private audioCtx: AudioContext | null = null;

  handleSound() {
    this._initializeAudio();
    this.play(this.on ? switchOnMp3 : switchOffMp3);

    console.log(
      this.on,
      "create the sound",
      this.on ? "TURN ON SWITCH" : "TURN OFF SWITCH"
    );
  }

  private _initializeAudio() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.audioCtx = new AudioContext();
  }

  async play(url: string) {
    if (this.audioCtx) {
      const buffer = await fetch(url)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) =>
          this.audioCtx?.decodeAudioData(arrayBuffer)
        );

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
          room: this.room,
        },
        bubbles: true,
      })
    );

    this.handleSound();
  }

  static styles = css``;

  render() {
    return html`
      <ah-button
        .outlined=${!this.on}
        fullwidth
        @click=${this.handleToggle}
        >${!this.on ? "ON" : "OFF"}</ah-button
      >
    `;
  }
}

/**
 * An ah-light element.
 */
@customElement("ah-light")
export class AHLight extends LitElement {
  @property({ type: Boolean })
  on = false;

  static styles = css`
    svg {
      fill: white;
      height: 48px;
      width: 48px;
    }

    .on svg {
      fill: red;
    }
  `;

  render() {
    return html`
      <div
        class=${classMap({
          on: this.on,
        })}
      >
        ${this.on ? LIGHT_ICON : DARK_ICON}
      </div>
    `;
  }
}

/**
 * An ah-room element.
 */
@customElement("ah-room")
export class AHRoom extends LitElement {
  @property({ type: Boolean })
  on = false;

  @property({ type: String })
  room = "";

  static styles = css`
    .container {
      display: block;
      width: 100%;
      height: 100%;
      display: grid;
      place-content: center;
    }

    .on {
      background: yellow;
    }
  `;

  render() {
    return html`
      <div
        class=${classMap({
          on: this.on,
          container: true,
        })}
      >
        <ah-light .on=${this.on}></ah-light>
        ${this.room}
      </div>
    `;
  }
}
