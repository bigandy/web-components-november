import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-supports": AHSupports;
  }
}

/**
 * An ah-supports element.
 * @slot - This element has a slot
 */
@customElement("ah-supports")
export class AHSupports extends LitElement {
  @property()
  show = false;

  render() {
    if (!this.show) {
      return null;
    }

    return html` <div class="banner">
      <slot> </slot>
    </div>`;
  }

  static styles = css`
    .banner {
      display: block;
      padding-inline: 1em;
      border: 10px double red;
    }
  `;
}
