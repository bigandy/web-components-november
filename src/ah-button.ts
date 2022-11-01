import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

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
  @state()
  private active: boolean = false;

  _toggleState = () => {
    this.active = !this.active;
  };

  render() {
    return html`
      <button
        class=${classMap({ active: this.active })}
        @click=${this._toggleState}
      >
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

    .active {
      background: green;
      color: white;
      border-color: green;
    }

    button {
      border-radius: 20px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s, background-color 0.25s;
    }

    button:hover {
      border-color: #646cff;
    }

    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }

      button {
        background-color: #f9f9f9;
      }
    }
  `;
}
