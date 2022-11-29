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

    console.log({ position: position.coords });

    this.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

    this.mapLinkText = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

    //   status.textContent = "";
  }

  error(e: any) {
    console.error(e);
  }

  render() {
    return html`<ah-button @click=${this.geoFindMe}>
        Show my location</ah-button
      ><br />
      ${this.href !== ""
        ? html`<a href=${this.href} target="_blank"
            >${this.mapLinkText}</a
          >`
        : ""} `;
  }

  static styles = css``;
}
