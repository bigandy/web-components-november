import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-digit": AHDigit;
  }
}
/**
 * An ah-digit element.
 */
@customElement("ah-digit")
export class AHDigit extends LitElement {
  @property({ type: String })
  numberstring = "one";

  static styles = css`
    :host {
      display: inline-block;
      --digit-dimension: 10;
      --digit-padding: 2;
      --digit-radius: 3;
      --padding: 0.25em;
    }

    .digit__inner {
      height: 50%;
      position: relative;
    }

    .digit-wrapper {
      height: calc(
        calc(calc(100 - var(--digit-dimension)) * 1px) +
          calc(var(--padding) * 2)
      );
      overflow: hidden;
      width: 100px;
    }

    .digit {
      padding: var(--padding);
      height: 100px;
      background: black;
      position: relative;
    }
    .digit .seg {
      position: absolute;
      background: red;
      border-radius: calc(var(--digit-radius) * 1px);
    }
    .digit .top,
    .digit .bottom {
      height: calc(var(--digit-dimension) * 1px);
      width: calc(
        100% - calc(calc(var(--digit-dimension) + var(--digit-padding)) * 2px)
      );
      left: calc(calc(var(--digit-dimension) + var(--digit-padding)) * 1px);
    }
    .digit .bottom {
      bottom: 0px;
    }
    .digit .left,
    .digit .right {
      height: calc(
        100% - calc(calc(var(--digit-dimension) + var(--digit-padding)) * 2px)
      );
      width: calc(var(--digit-dimension) * 1px);
      position: absolute;
      top: calc(calc(var(--digit-dimension) + var(--digit-padding)) * 1px);
    }
    .digit .left {
      left: 0;
    }
    .digit .right {
      right: 0;
    }

    .digit__inner--bottom {
      margin-top: -10px;
    }

    .one .seg:not(.right) {
      display: none;
    }

    .two .bottom-right,
    .two .top-left {
      display: none;
    }

    .three .top-left,
    .three .bottom-left {
      display: none;
    }

    .four .top-top,
    .four .bottom-bottom,
    .four .bottom-left {
      display: none;
    }

    .five .top-right,
    .five .bottom-left {
      display: none;
    }

    .six .top-top,
    .six .top-right {
      display: none;
    }

    .seven .top-left,
    .seven .bottom-top,
    .seven .bottom-bottom,
    .seven .bottom-left {
      display: none;
    }

    .nine .bottom-left,
    .nine .bottom-bottom {
      display: none;
    }

    .zero .bottom-top {
      display: none;
    }
  `;

  render() {
    console.log(this.numberstring);
    return html`
      <div class="digit-wrapper ${this.numberstring}">
        <div class="digit">
          <div class="digit__inner digit__inner--top">
            <div class="seg left top-left"></div>
            <div class="seg right top-right"></div>
            <div class="seg top top-top"></div>
          </div>

          <div class="digit__inner digit__inner--bottom">
            <div class="seg bottom-left left"></div>
            <div class="seg bottom-right right"></div>
            <div class="seg bottom-bottom bottom"></div>
            <div class="seg bottom-top top"></div>
          </div>
        </div>
      </div>
    `;
  }
}
