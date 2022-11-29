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

  @state()
  acceleration?: { x: any; y: any; z: any } | null;

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

    this.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

    this.mapLinkText = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  error(e: any) {
    console.error(e);
  }

  connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener("deviceorientation", (event) =>
      this.handleOrientation(event)
    );
  }

  handleMotion(event: DeviceMotionEvent) {
    let accelerometer = null;
    try {
      // @ts-ignore
      accelerometer = new Accelerometer({ frequency: 10 });
      accelerometer.onerror = (event: any) => {
        // Handle runtime errors.
        if (event.error.name === "NotAllowedError") {
          console.log("Permission to access sensor was denied.");
        } else if (event.error.name === "NotReadableError") {
          console.log("Cannot connect to the sensor.");
        }
      };
      accelerometer.onreading = (e) => {
        console.log(e);
        this.acceleration = e;
      };
      accelerometer.start();
    } catch (error: any) {
      // Handle construction errors.
      if (error.name === "SecurityError") {
        console.log(
          "Sensor construction was blocked by the Permissions Policy."
        );
      } else if (error.name === "ReferenceError") {
        console.log("Sensor is not supported by the User Agent.");
      } else {
        throw error;
      }
    }
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
    return html`<ah-button @click=${this.geoFindMe}> Show my location</ah-button
      ><br />
      ${this.href !== ""
        ? html`<a href=${this.href} target="_blank">${this.mapLinkText}</a>`
        : ""}
      ${this.deviceOrientation !== null
        ? html`
            <ah-header variant="h3">Device Orientation</ah-header>
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
                      ? Math.floor(this.deviceOrientation?.alpha)
                      : ""}
                  </td>
                  <td>
                    ${this.deviceOrientation?.beta
                      ? Math.floor(this.deviceOrientation?.beta)
                      : ""}
                  </td>
                  <td>
                    ${this.deviceOrientation?.gamma
                      ? Math.floor(this.deviceOrientation?.gamma)
                      : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          `
        : html`<p>No deviceOrientation</p>`}
      ${JSON.stringify(this.acceleration)} `;
  }

  static styles = css``;
}
