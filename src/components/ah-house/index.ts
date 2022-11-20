import { LitElement, html } from "lit";
import { customElement, state, property } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-house": AHHouse;
    "ah-light": AHLight;
    "ah-switch": AHSwitch;
  }
}

/**
 * An ah-house element.
 * @slot - This element has a slot
 */
@customElement("ah-house")
export class AHHouse extends LitElement {
  @state()
  lightOn = false;

  handleSwitch(e: any) {
    this.lightOn = e.detail;
  }

  render() {
    return html`
      <div @switch=${this.handleSwitch}>
        <slot></slot>

        <ah-switch></ah-switch>

        <ah-light .on=${this.lightOn}></ah-light>
      </div>
    `;
  }
}

/**
 * An ah-house element.
 */
@customElement("ah-switch")
export class AHSwitch extends LitElement {
  @state()
  on = false;

  handleToggle() {
    this.on = !this.on;
    // emit custom event

    this.dispatchEvent(
      new CustomEvent("switch", {
        detail: this.on,
        bubbles: true,
      })
    );
  }

  render() {
    return html`
      <ah-button @click=${this.handleToggle}
        >${this.on ? "ON" : "OFF"}</ah-button
      >
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

  render() {
    return html` <div>${this.on ? "LIGHT IS ON" : "LIGHT OFF"}</div> `;
  }
}
