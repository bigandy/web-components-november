import { LitElement, css, html } from "lit";
import {
  customElement,
  property,
  state,
} from "lit/decorators.js";

import { classMap } from "lit/directives/class-map.js";

import checkersWorklet from "../../assets/js/houdini-checkers.js?url";
import circlesWorklet from "../../assets/js/houdini-circles.js?url";

declare global {
  interface HTMLElementTagNameMap {
    "ah-houdini-banner": AHHoudiniBanner;
  }
}

/**
 * An ah-houdini-button element.
 * @slot - This element has a slot
 */
@customElement("ah-houdini-banner")
export class AHHoudiniBanner extends LitElement {
  @state()
  browserSupported = true;

  @property({ type: Boolean })
  checkers = false;

  @property({ type: Boolean })
  circles = false;

  @property({ type: Boolean })
  hideWarning = false;

  connectedCallback(): void {
    super.connectedCallback();

    if ("paintWorklet" in CSS) {
      if (this.checkers) {
        // @ts-ignore
        CSS.paintWorklet.addModule(checkersWorklet);
      } else if (this.circles) {
        // @ts-ignore
        CSS.paintWorklet.addModule(circlesWorklet);
      }
    } else {
      this.browserSupported = false;
    }
  }
  render() {
    return html` <ah-supports
        ?show=${!this.browserSupported && !this.hideWarning}
        ><p>
          Your browser does not support the CSS Houdini
          Paint API. Please try latest Chrome or Edge or
          Opera.
          <a href="https://caniuse.com/?search=paint%20"
            >Details here</a
          >
        </p></ah-supports
      >
      <div
        class=${classMap({
          checkers: this.checkers,
          circles: this.circles,
          fallback:
            !this.browserSupported ||
            (!this.circles && !this.checkers),
        })}
      >
        <slot> </slot>
      </div>`;
  }

  static styles = css`
    :host {
      color: var(--ah-houdini-banner-color, inherit);
    }

    .checkers {
      background: paint(checkers);
    }

    .circles {
      background: paint(circles);
    }

    .fallback {
      background: black;
      color: white;
    }
  `;
}
