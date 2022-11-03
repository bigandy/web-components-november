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

      if (this.key) {
        console.log({ json: json[this.key] });
        const key = json[this.key] ?? [];

        // console

        if (this.values !== "") {
          const values = this.values.split(" ");
          console.log(values, key);

          // const ret = [];
          // key.forEach((item) => {
          //   values.forEach((val) => {
          //     if (item[val]) {
          //       ret.push({ret[val]: item[val]});
          //     }
          //   });

          // console.log(item);
          // });

          // console.log(ret);

          //   this.result.map((result) => {
          //     const ret = result.map((res) => {
          //       console.log(res);
          //     });
          //   });
        }

        this.result = key;
      } else {
        console.log(json);
        this.result = [];
      }
    }
  }

  protected render() {
    return html`
      <div>
        <h2>
          This is the data for
          <a href=${this.dataSource}>${this.dataSource}</a>
          with the data key of <em>${this.key}</em>
        </h2>
        ${JSON.stringify(this.result)}
      </div>
    `;
  }

  static styles = css``;
}
