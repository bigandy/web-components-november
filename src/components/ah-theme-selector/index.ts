import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

const localStorageKey = "wcn2022-theme";

declare global {
  interface HTMLElementTagNameMap {
    "ah-theme-selector": AHThemeSelector;
  }
}

type themeType = "none" | "dark" | "rainbow" | "red";

/**
 * An ah-theme-selector element.
 */
@customElement("ah-theme-selector")
export class AHThemeSelector extends LitElement {
  @state()
  open: Boolean = false;

  @state()
  theme: themeType = "none";

  connectedCallback() {
    super.connectedCallback();

    const storage = localStorage.getItem(localStorageKey);

    if (storage) {
      this.theme = storage as themeType;

      document.body.className = this.theme;
    }
  }

  firstUpdated() {
    // console.log("custom element is now connected");
    const btn = this.shadowRoot?.querySelector("ah-button");

    if (btn) {
      btn.addEventListener("click", () => {
        this.open = !this.open;
        hideOnClickOutside(this);
      });
    }

    const hideOnClickOutside = (element: any) => {
      const outsideClickListener = (event: any) => {
        if (
          element.contains(event.target) ===
          element.classList.contains("closed")
        ) {
          this.open = false;
          removeClickListener();
        }
      };

      const removeClickListener = () => {
        document.removeEventListener("click", outsideClickListener);
      };

      document.addEventListener("click", outsideClickListener);
    };
  }

  handleToggle() {
    this.open = !this.open;
  }

  handleInputClick = (e: any) => {
    const theme = e.target.id;
    this.theme = theme;
    localStorage.setItem(localStorageKey, theme); // save to localStorage

    document.body.className = this.theme;
  };

  render() {
    return html`<div
      class=${classMap({
        red: this.theme === "red",
        rainbow: this.theme === "rainbow",
        dark: this.theme === "dark",
      })}
    >
      <div
        class=${classMap({
          // @ts-ignore
          buttonOpen: this.open,
        })}
      >
        <ah-button
          >${!this.open
            ? "Open Theme Selector"
            : "Close Theme Selector"}</ah-button
        >
      </div>

      <div
        class=${classMap({
          drawer: true,
          closed: !this.open,
        })}
      >
        <div>
          <label for="none">None</label
          ><input
            @click=${this.handleInputClick}
            type="radio"
            name="theme"
            id="none"
            ?checked=${this.theme === "none"}
          />
        </div>
        <div>
          <label for="dark">Dark</label
          ><input
            @click=${this.handleInputClick}
            type="radio"
            name="theme"
            id="dark"
            ?checked=${this.theme === "dark"}
          />
        </div>
        <div>
          <label for="red">Red</label
          ><input
            @click=${this.handleInputClick}
            type="radio"
            name="theme"
            id="red"
            ?checked=${this.theme === "red"}
          />
        </div>
        <div>
          <label for="rainbow">Rainbow</label
          ><input
            @click=${this.handleInputClick}
            type="radio"
            name="theme"
            id="rainbow"
            ?checked=${this.theme === "rainbow"}
          />
        </div>
      </div>
    </div>`;
  }

  static styles = css`
    :host {
      position: relative;
      padding-bottom: 2em;
    }

    .buttonOpen {
      margin-bottom: 120px;
    }

    .closed {
      display: none;
    }

    .drawer {
      width: 200px;

      border: 1px solid black;
      background: var(--theme-bg, white);
      color: var(--theme-color, black);
      box-shadow: -3px 3px 3px var(--button-shadow, var(--link-color, red));
      padding: 1em;
      position: absolute;
      top: 3em;
      left: 0;
      margin-bottom: 1em;
      z-index: 2;

      background: var(--theme-bg);
      color: var(--theme-color);
    }

    .drawer > div {
      display: grid;
      grid-template-columns: 1fr auto;
    }

    :is(input, label) {
      cursor: pointer;
    }

    .drawer [type="radio"] {
      justify-self: flex-start;
    }

    ah-button {
      --ah-button-background: var(--theme-bg, black);
      --ah-button-color: var(--theme-color, white);
    }
  `;
}
