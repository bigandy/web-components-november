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
  stars = false;

  connectedCallback(): void {
    super.connectedCallback();

    if ("paintWorklet" in CSS) {
      console.log("supports  paintWorklet!");

      if (this.checkers) {
        // @ts-ignore
        CSS.paintWorklet.addModule(
          "/js/houdini-checkers.js"
        );
      } else if (this.stars) {
        // @ts-ignore
        CSS.paintWorklet.addModule("/js/houdini-stars.js");
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
        stars: this.stars,
        fallback: !this.stars && !this.checkers,
      })}
    >
      <ah-supports .show=${!this.browserSupported}
        ><p>
          Your browser does not support the CSS Houdini
          Paint API. Please try latest Chrome or Edge or
          Opera.
          <a href="https://caniuse.com/?search=paint%20"
            >Details here</a
          >
        </p></ah-supports
      >
      ${this.browserSupported ? html`<slot> </slot>` : null}
    </div>`;
  }

  static styles = css`
    @supports (background: paint(checkers)) {
      .checkers {
        background: paint(checkers);
      }

      .stars {
        background: paint(stars);
      }
    }

    .fallback {
      background: black;
      color: white;
    }
  `;
}
