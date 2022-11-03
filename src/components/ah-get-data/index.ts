import { LitElement, css, html } from "lit";
import {
  customElement,
  property,
  state,
} from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-get-data": AHGetData;
  }
}

/**
 * An ah-button element. A simple button that has a toggleable active state that changes when you click the button.
 * @slot - This element has a slot
 */
@customElement("ah-get-data")
export class AHGetData extends LitElement {
  @property({ type: String })
  dataSource = undefined;

  @property({ type: String })
  key = undefined;

  @property({ type: String })
  values = "";

  @state()
  result = [];

  async connectedCallback() {
    super.connectedCallback();

    if (this.dataSource) {
      const json = await fetch(this.dataSource).then(
        (data) => data.json()
      );

      const data = this.key ? json[this.key] : json;

      if (this.values !== "") {
        const fieldsToGrab = this.values.split(" ");

        const result = data.map((drink: any) => {
          const output = {};
          fieldsToGrab.forEach((field) => {
            // @ts-ignore
            output[field] = drink[field];
          });
          return output;
        });

        this.result = result;
      } else {
        this.result = data;
      }
    }
  }

  renderTable() {
    if (this.result.length === 0) {
      return html`<strong>No Results</strong>`;
    }

    const fieldsToGrab = this.values.split(" ");

    return html`
      <table>
        <thead>
        ${fieldsToGrab.map((field) => {
          return html` <th>${field}</th> `;
        })}

        ${this.result.map((row) => {
          return html`
            <tr>
              ${Object.values(row).map((value) => {
                return html`<td>${value}</td>`;
              })}
            </tr>
          `;
        })}
      </table>
    `;
  }

  protected render() {
    return html`
      <div>
        <h2>
          This is the data for
          <a href=${this.dataSource}>${this.dataSource}</a>
          with the data key of <u>${this.key}</u> and values
          of <u>${this.values}</u>
        </h2>
        ${this.renderTable()}
      </div>
    `;
  }

  static styles = css`
    table {
      width: 100%;
    }
    table,
    th,
    td {
      border: 1px solid black;
      border-collapse: collapse;
      padding: 0.5em;
    }
  `;
}
