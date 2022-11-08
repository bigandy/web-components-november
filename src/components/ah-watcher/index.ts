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
  })
  matched = false;

  handleMatched(e: any) {
    this.matched = e.detail;
  }

  render() {
    return html`
      <slot @matched=${this.handleMatched}></slot>
    `;
  }
}
