import { LitElement, html } from "lit";
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
export class AHIsVisible extends IntersectionElementMixin(
  LitElement
) {
  private _elementVisible = false;

  @property()
  IOVisibleLimit = 0.5;

  @property()
  get elementVisible() {
    return this._elementVisible;
  }

  set elementVisible(val: boolean) {
    let oldVal = this._elementVisible;
    this._elementVisible = val;

    this.dispatchEvent(
      new CustomEvent("matched", {
        detail: this.elementVisible,
        bubbles: true,
      })
    );
    this.requestUpdate("elementVisible", oldVal);
  }

  render() {
    return html`
      <div
        style=${styleMap({
          backgroundColor: this.elementVisible
            ? "green"
            : "red",
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}
