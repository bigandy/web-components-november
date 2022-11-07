import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-watcher": AHWatcher;
  }
}

/**
 * An ah-is-visible element.
 * A wrapper element that detects whether the content within is in the viewport
 */
@customElement("ah-watcher")
export class AHWatcher extends LitElement {
  @property({
    type: Boolean,
    reflect: true,
    // attribute: false,
  })
  matched = false;

  handleMatched(e: any) {
    console.log("Detail is:::", e.detail);

    this.matched = !this.matched;
  }

  render() {
    return html` <slot @matched=${this.handleMatched}></slot> `;
  }
}
