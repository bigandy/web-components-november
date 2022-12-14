import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
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
  @property({ type: Boolean })
  outlined = false;

  @property({ type: Boolean })
  fullwidth = false;

  render() {
    return html`
      <button
        class=${classMap({
          outlined: this.outlined,
          fullwidth: this.fullwidth,
        })}
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

    button {
      border-radius: calc(
        var(
            --ah-button-border-radius,
            var(--border-radius-large, 8)
          ) * 1px
      );
      border: none;
      padding-inline: var(
        --ah-button-padding-inline,
        1.2em
      );
      padding-block: var(--ah-button-padding-block, 0.6em);
      font-size: 1em;
      background: var(
        --ah-button-background,
        var(--brand, black)
      );
      color: var(--ah-button-color, white);
      cursor: pointer;
      transition: background-color 0.25s;
      border: 1px solid transparent;
    }

    .fullwidth {
      width: 100%;
    }

    .outlined {
      border-color: var(
        --ah-button-background,
        var(--brand, black)
      );
      color: var(--ah-button-outlined-color, black);
    }

    .outlined:hover,
    .outlined {
      background: unset;
    }

    .outlined:hover {
      border-color: var(
        --ah-button-background-hover,
        var(--brand-hover, grey)
      );
      background-color: lightgray;
    }

    button:hover {
      background-color: var(
        --ah-button-background-hover,
        var(--brand-hover, grey)
      );
    }
  `;
}
