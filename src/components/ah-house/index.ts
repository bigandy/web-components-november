import { LitElement, html, css } from "lit";
import {
  customElement,
  state,
  property,
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

import {
  LIGHT_ICON,
  DARK_ICON,
} from "../../constants/icons";

declare global {
  interface HTMLElementTagNameMap {
    "ah-house": AHHouse;
    "ah-light": AHLight;
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
      --house-bg: black;
    }

    .roof {
      position: absolute;
      top: -100px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 200px 100px 200px;
      border-color: transparent transparent var(--house-bg)
        transparent;
    }

    .house {
      box-sizing: border-box;
      padding: 1em;
      margin-top: 100px;
      height: 250px;
      width: 400px;
      background: var(--house-bg);
      position: relative;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1em;
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
    newState[e.detail.ref] = e.detail.state;
    this.lights = newState;
  }

  render() {
    const checkedPercent =
      (Object.values(this.lights).filter(Boolean).length /
        Object.values(this.lights).length) *
      100;
    return html`
      <div
        class="house"
        @switch=${this.handleSwitch}
        style=${styleMap({
          "--house-bg": `hsla(60, 100%, ${
            checkedPercent / 2
          }%, 1)`,
        })}
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
          <h3>main</h3>
          <ah-switch
            ?on=${this.lights.main}
            ref="main"
            fullWidth
          ></ah-switch>

          <h3>kitchen</h3>
          <ah-switch
            ?on=${this.lights.kitchen}
            ref="kitchen"
            fullWidth
          ></ah-switch>

          <h3>bedroom</h3>
          <ah-switch
            ?on=${this.lights.bedroom}
            ref="bedroom"
            fullWidth
          ></ah-switch>

          <h3>lounge</h3>
          <ah-switch
            ?on=${this.lights.lounge}
            ref="lounge"
            fullWidth
          ></ah-switch>
        </div>
      </div>
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
      color: white;
    }

    .on {
      background: yellow;
      color: black;
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
