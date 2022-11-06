import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { IntersectionElementMixin } from "../../utils/intersectionElementMixin";

declare global {
  interface HTMLElementTagNameMap {
    "ah-is-visible": AHIsVisible;
  }
}

/**
 * An ah-is-visible element.
 * A wrapper element that detects whether the content within is in the viewport
 */
@customElement("ah-is-visible")
export class AHIsVisible extends IntersectionElementMixin(LitElement) {
  constructor() {
    super();

    // this.IORemoveOnVisible = true;
    // this.IORootElement = this.parentNode;
  }

  @property({
    type: Boolean,
    attribute: false,
  })
  elementVisible = false;

  render() {
    console.log("is visible?", this.elementVisible);

    return html`
      <div
        style=${styleMap({
          backgroundColor: this.elementVisible ? "red" : "green",
        })}
      >
        ${this.elementVisible ? "visible" : "invisible"}
        <slot></slot>
      </div>
    `;
  }
}
