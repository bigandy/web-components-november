import { LitElement, css, html } from "lit";
import {
  customElement,
  property,
  state,
} from "lit/decorators.js";

import { classMap } from "lit/directives/class-map.js";

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
      console.log("supports  paintWorklet!");

      if (this.checkers) {
        // @ts-ignore
        CSS.paintWorklet.addModule(
          "/js/houdini-checkers.js"
        );
      } else if (this.circles) {
        // @ts-ignore
        CSS.paintWorklet.addModule(
          "/js/houdini-circles.js"
        );
      }
    } else {
      console.log("doesn't support paintWorklet");
      this.browserSupported = false;
    }
  }
  render() {
    return html`<div
      class=${classMap({
        checkers: this.checkers,
        circles: this.circles,
        fallback: !this.circles && !this.checkers,
      })}
    >
      <ah-supports
        .show=${!this.browserSupported && !this.hideWarning}
        ><p>
          Your browser does not support the CSS Houdini
          Paint API. Please try latest Chrome or Edge or
          Opera.
          <a href="https://caniuse.com/?search=paint%20"
            >Details here</a
          >
        </p></ah-supports
      >
      <slot> </slot>
    </div>`;
  }

  static styles = css`
    @supports (background: paint(checkers)) {
      .checkers {
        background: paint(checkers);
      }

      .circles {
        background: paint(circles);
        color: black;
      }
    }

    .fallback {
      background: black;
      color: white;
    }
  `;
}
