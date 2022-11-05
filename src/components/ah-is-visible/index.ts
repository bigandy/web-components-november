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
// @ts-ignore -- need to sort this one out if possible!
@customElement("ah-is-visible")
export class AHIsVisible extends IntersectionElementMixin(LitElement) {
  static styles = css`
    ::slotted(*) {
      display: none;
    }
  `;

  constructor() {
    super();

    // this.IORemoveOnVisible = true;
    // this.IORootElement = this.parentNode;
  }

  @property({
    type: Boolean,
    attribute: false,
    // hasChanged: (newVal, oldVal) => {
    //   console.log(this);
    //   // this.parentNode.style.backgroundColor = newVal ? "red" : "green";
    //   //   console.log({ newVal, oldVal });
    //   return true;
    // },
  })
  elementVisible = false;

  render() {
    console.log("is visible?", this.elementVisible);

    // document.documentElement.style.backgroundColor = this.elementVisible
    //   ? "red"
    //   : "green";

    return html`
      <div
        style=${styleMap({
          backgroundColor: this.visible ? "red" : "green",
        })}
      >
        ${this.elementVisible ? "visible" : "invisible"}
        <slot></slot>
      </div>
    `;
  }
}
