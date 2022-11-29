import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-geolocation": AHGeolocation;
  }
}

/**
 * An ah-geolocation element.
 */
@customElement("ah-geolocation")
export class AHGeolocation extends LitElement {
  @state()
  href = "";

  @state()
  mapLinkText = "";

  @state()
  coords?: string;

  @state()
  deviceOrientation?: {
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
  } | null = null;

  geoFindMe() {
    if (!navigator.geolocation) {
      //   status.textContent =
      //     "Geolocation is not supported by your browser";
    } else {
      const options = {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0,
      };
      //   status.textContent = "Locating…";
      navigator.geolocation.watchPosition(
        (position) => this.success(position),
        (error) => this.error(error),
        options
      );
    }
  }

  success(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // console.log({ position: position.coords });

    this.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

    this.mapLinkText = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

    //   status.textContent = "";
  }

  error(e: any) {
    console.error(e);
  }

  connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener(
      "deviceorientation",
      (orientation) => this.handleOrientation(orientation)
    );
  }

  handleOrientation(event: DeviceOrientationEvent) {
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;

    this.deviceOrientation = {
      alpha,
      beta,
      gamma,
    };
  }

  render() {
    console.log(this.deviceOrientation);

    return html`<ah-button @click=${this.geoFindMe}>
        Show my location</ah-button
      ><br />
      ${this.href !== ""
        ? html`<a href=${this.href} target="_blank"
            >${this.mapLinkText}</a
          >`
        : ""}
      ${this.deviceOrientation !== null
        ? html`
            <table>
              <thead>
                <tr>
                  <th>Alpha</th>
                  <th>Beta</th>
                  <th>Gamma</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    ${this.deviceOrientation?.alpha
                      ? Math.floor(
                          this.deviceOrientation?.alpha
                        )
                      : ""}
                  </td>
                  <td>
                    ${this.deviceOrientation?.beta
                      ? Math.floor(
                          this.deviceOrientation?.beta
                        )
                      : ""}
                  </td>
                  <td>
                    ${this.deviceOrientation?.gamma
                      ? Math.floor(
                          this.deviceOrientation?.gamma
                        )
                      : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          `
        : html`<p>No deviceOrientation</p>`} `;
  }

  static styles = css``;
}
