import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-details-link": AHDetailsLink;
  }
}

/**
 * An ah-details-link element.
 * @slot - This element has a slot
 */
@customElement("ah-details-link")
export class AHDetailsLink extends LitElement {
  @property()
  id: string = "";

  @property()
  title: string = "";

  @property()
  date: string = "";

  @property()
  summary: string = "";

  @property()
  prev?: string;

  @property()
  next?: string;

  @state()
  open = false;

  constructor() {
    super();

    window.addEventListener("hashchange", () => {
      console.log("hash has changed");

      if ("#" + this.id === window.location.hash) {
        const details = document.querySelectorAll("details");
        [...details].forEach(function (detail) {
          detail.removeAttribute("open");
        });
        this.open = true;
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();

    if ("#" + this.id === window.location.hash) {
      this.shadowRoot?.querySelector("details")?.setAttribute("open", "open");
      this.open = true;
    }
  }

  handleNextClick() {
    window.location.hash = "#" + this.next;
  }

  handlePrevClick() {
    window.location.hash = "#" + this.prev;
  }

  async handleDateClick() {
    window.location.hash = "#" + this.id;

    try {
      await navigator.clipboard.writeText(window.location.href);
      console.log("Content copied to clipboard", window.location.href);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  render() {
    return html`
      <h3 id=${this.id} @click=${this.handleDateClick}>${this.date}</h3>

      <details .open=${this.open}>
        <summary>${this.summary}</summary>

        <slot></slot>

        ${this.prev
          ? html`<a href="#${this.prev}" @click=${this.handlePrevClick}
              >previous component</a
            >`
          : null}
        ${this.next
          ? html`<a href="#${this.next}" @click=${this.handleNextClick}
              >next component</a
            >`
          : null}
      </details>
    `;
  }
}
