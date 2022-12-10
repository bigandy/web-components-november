import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { VH } from "../../constants/styles";
import { BACK_ICON, FORWARD_ICON, COPY_ICON } from "../../constants/icons";

declare global {
  interface HTMLElementTagNameMap {
    "ah-component-section": AHComponentSection;
  }
}

/**
 * An ah-details-link element.
 * @slot - This element has a slot
 */
@customElement("ah-component-section")
export class AHComponentSection extends LitElement {
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

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  tags?: string;

  static styles = [
    VH,
    css`
      .tag-title {
        margin-block: 1em 0.5em;
        display: block;
      }
      .tag {
        margin: 0 0.5rem 0.5rem 0;
        border-radius: calc(var(--border-radius-small) * 1px);
        display: inline-block;
        border: 1px solid black;
        padding: 0.5rem 0.25rem;
      }

      .container {
        border: 5px solid orange;
        padding: 0.5em;
        overflow: auto;
        height: calc(100% - 20px);
        border-radius: calc(var(--border-radius-medium) * 1px);
      }

      .containerOpen {
        margin-bottom: 1.5em;
        padding-bottom: 1em;
      }

      h3 {
        cursor: pointer;
      }

      h3 svg {
        fill: lightgray;
        height: 20px;
        aspect-ratio: 1;
        transition: fill 0.3s ease-in-out;
      }

      h3:hover svg {
        fill: black;
      }

      .link {
        display: none;
        position: fixed;
        top: 0;

        height: 100%;
        transition: background-color 0.3s ease-in-out, fill 0.3s ease-in-out;
        fill: var(--brand);
      }

      .link:hover {
        background-color: lightgrey;
        fill: var(--brand-hover);
      }

      .link--prev {
        left: 0;
      }

      .link--next {
        right: 0;
      }

      ah-noise-button {
        --ah-button-padding-inline: 0;
        --ah-button-padding-block: 0;
        --ah-button-border-radius: var(--border-radius-small);
      }

      @media (min-width: 500px) {
        .link {
          display: grid;
          place-content: center;
        }

        .container {
          padding: 0.5em 1em;
          border: 10px solid green;
        }

        .containerOpen {
          border-color: lightblue;
          padding-bottom: 1em;
        }
      }
    `,
  ];

  constructor() {
    super();

    window.addEventListener("hashchange", () => {
      // console.log("hash has changed");
      if ("#" + this.id === window.location.hash) {
        this.open = true;
      } else {
        this.open = false;
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();

    if ("#" + this.id === window.location.hash) {
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

    // add the url to the clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  toggleDetails(e: MouseEvent) {
    e.preventDefault();
    this.open = !this.open;
  }

  render() {
    return html`
      <li
        class=${classMap({
          container: true,
          containerOpen: this.open,
        })}
      >
        <h3 id=${this.id} @click=${this.handleDateClick}>
          ${this.date}${COPY_ICON}
        </h3>

        <details ?open=${this.open}>
          <summary @click=${this.toggleDetails}>${this.summary}</summary>

          <slot></slot>

          ${this.prev
            ? html`<ah-noise-button
                class="link link--prev"
                @click=${this.handlePrevClick}
                lazer
                >${BACK_ICON}<span class="vh">previous</span></ah-noise-button
              >`
            : null}
          ${this.next
            ? html`<ah-noise-button
                class="link link--next"
                href="#${this.next}"
                @click=${this.handleNextClick}
                lazer
                >${FORWARD_ICON}<span class="vh">next</span></ah-noise-button
              >`
            : null}
        </details>
        ${this.tags
          ? html` <ah-heading noGutter class="tag-title" variant="h4"
                >Tags</ah-heading
              >
              ${this.tags?.split(",").map((tag) => {
                return html`<span class="tag">${tag}</span>`;
              })}`
          : ""}
      </li>
    `;
  }
}
