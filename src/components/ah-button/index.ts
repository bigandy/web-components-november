import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-button": AHButton;
  }
}

/**
 * An ah-button element. A simple button that has a toggleable active state that changes when you click the button.
 * @slot - This element has a slot
 * @csspart after - The after part of the button
 * @csspart before - The before part of the button
 */
@customElement("ah-button")
export class AHButton extends LitElement {
  render() {
    return html`
      <button>
        <slot
          part="before"
          class="before"
          name="before"
        ></slot>
        <slot></slot>
        <slot
          part="after"
          class="after"
          name="after"
        ></slot>
      </button>
    `;
  }

  static styles = css`
    .after,
    .before {
      display: inline-block;
    }

    button {
      border-radius: 20px;
      border: none;
      padding-inline: var(
        --ah-button-padding-inline,
        1.2em
      );
      padding-block: var(--ah-button-padding-block, 0.6em);
      font-size: 1em;
      background-color: var(--ah-button-background, green);
      color: var(--ah-button-color, white);
      cursor: pointer;
      transition: background-color 0.25s;
    }

    button:hover {
      background-color: var(
        --ah-button-background-hover,
        darkgreen
      );
    }
  `;
}
