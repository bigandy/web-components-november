import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-scroller": AHScroller;
  }
}

/**
 * An ah-scroller element.
 * @slot - This element has a slot
 */
@customElement("ah-scroller")
export class AHScroller extends LitElement {
  @property({ type: Boolean })
  scrollX = false;

  @property({ type: Boolean })
  scrollY = false;

  @property({ type: Boolean })
  scrollBoth = false;

  @property({ type: Boolean })
  scrollbars = false;

  @property({ type: Number })
  height = undefined;

  @property({ type: Number })
  width = undefined;

  @property({ type: Boolean })
  hideBorder = false;

  render() {
    return html`
      <div
        class=${classMap({
          scrollX: this.scrollX,
          scrollY: this.scrollY,
          scrollBoth: this.scrollBoth,
          scrollbars: this.scrollbars,
          border: !this.hideBorder,
        })}
        style=${styleMap({
          height: this.height ? `${this.height}px` : "auto",
          width: this.width ? `${this.width}px` : "auto",
        })}
      >
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    div {
      overscroll-behavior: none;
    }

    .border {
      border: 1px solid;
    }

    .scrollbars::-webkit-scrollbar {
      -webkit-appearance: none;

      --ah-scrollbar-scrollbar-dimension: 8;

      width: calc(
        var(--ah-scrollbar-scrollbar-dimension) * 1px
      );
      height: calc(
        var(--ah-scrollbar-scrollbar-dimension) * 1px
      );
    }

    .scrollbars::-webkit-scrollbar-thumb {
      --ah-scrollbar-scrollbar-thumb-background: rgb(
        255 0 0 / 0.95
      );
      --ah-scrollbar-scrollbar-thumb-shadow: 0 0 1px
        rgb(255 0 0 / 0.5);

      border-radius: 4px;
      background-color: var(
        --ah-scrollbar-scrollbar-thumb-background
      );
      box-shadow: var(
        --ah-scrollbar-scrollbar-thumb-shadow
      );
    }

    .scrollX {
      overflow-x: scroll;
    }

    .scrollY {
      overflow-y: scroll;
    }

    .scrollBoth {
      overflow: scroll;
    }
  `;
}
