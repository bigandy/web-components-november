import { CSSResultGroup, LitElement, css } from "lit";
import { html, unsafeStatic } from "lit/static-html.js";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-header": AHHeading;
  }
}

const headingTypes = ["h1", "h2", "h3", "h4", "h5", "h6"];

/**
 * An ah-heading element. A simple heading where you can control the rendered tag
 * @slot - This element has a slot
 */
@customElement("ah-heading")
export class AHHeading extends LitElement {
  @property({
    converter: (attrValue: string | null) => {
      if (attrValue && headingTypes.includes(attrValue?.toLowerCase())) {
        return attrValue;
      } else {
        return "h1";
      }
    },
  })
  variant: string = "h1";

  @property({ type: Boolean })
  noGutter = false;

  static styles?: CSSResultGroup | undefined = css`
    .noGutter {
      margin-block: 0;
    }
  `;

  render() {
    return html`
      <${unsafeStatic(this.variant)} class=${classMap({
      noGutter: this.noGutter,
    })}>
        <slot></slot>
      </${unsafeStatic(this.variant)}>
    `;
  }
}
