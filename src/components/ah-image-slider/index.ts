import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-image-slider": AHImageSlider;
  }
}

/**
 * An ah-image-slider element.
 * @slot - This element has a slot
 */
@customElement("ah-image-slider")
export class AHImageSlider extends LitElement {
  //   private squares = 3 * 3;

  private image = "";

  @state()
  boardState = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
  };

  render() {
    return html` <div
      class="board"
      style=${styleMap({})}
    ></div>`;
  }

  static styles = css`
    .board {
      border: 1px solid;
      width: 500px;
      aspect-ratio: 1;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
    }
  `;
}
