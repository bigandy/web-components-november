import { LitElement, css, html } from "lit";
import {
  customElement,
  property,
  state,
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-bluetooth-hr": AHBluetoothHR;
  }
}

/**
 * An ah-bluetooth-hr element.
 */
@customElement("ah-bluetooth-hr")
export class AHBluetoothHR extends LitElement {
  @state()
  device: any;

  @state()
  heartRate: any;

  @state()
  supportsBluetooth = false;

  @state()
  show = true;

  @property({ type: Number })
  maxHeartRate = 200;

  onDisconnected() {
    // console.log(`Device ${device.name} is disconnected.`);
    this.device = null;
  }

  handleDisconnect = () => {
    this.device.gatt.disconnect();
    this.device = null;
  };

  connectedCallback() {
    super.connectedCallback();

    // @ts-ignore - it does in chrome
    if (navigator.bluetooth) {
      this.supportsBluetooth = true;
    }
  }

  askForBlueToothDevices() {
    const handleHeartRateNotification = (event: any) => {
      const value = event.target.value;

      this.heartRate = this.parseHeartRate(value).heartRate;
    };

    // @ts-ignore
    navigator.bluetooth
      .requestDevice({
        filters: [{ services: ["heart_rate"] }],
      })
      .then((bluetoothDevice: any) => {
        this.device = bluetoothDevice;

        console.log({ bluetoothDevice });

        // Set up event listener for when device gets disconnected.
        bluetoothDevice.addEventListener(
          "gattserverdisconnected",
          this.onDisconnected
        );

        // Attempts to connect to remote GATT Server.
        return bluetoothDevice.gatt.connect();
      })
      .then((server: any) =>
        server.getPrimaryService("heart_rate")
      )
      .then((service: any) =>
        service.getCharacteristic("heart_rate_measurement")
      )
      .then((characteristic: any) =>
        characteristic.startNotifications()
      )
      .then((characteristic: any) => {
        characteristic.addEventListener(
          "characteristicvaluechanged",
          handleHeartRateNotification
        );
      })

      .catch((error: any) => {
        console.error(error);
        this.supportsBluetooth = false;
      });
  }

  /**
   * https://github.com/WebBluetoothCG/demos/blob/gh-pages/heart-rate-sensor/heartRateSensor.js
   */
  parseHeartRate(value: DataView) {
    // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
    value = value.buffer
      ? value
      : new DataView(value as unknown as ArrayBufferLike);
    let flags = value.getUint8(0);
    let rate16Bits = flags & 0x1;
    let result: any = {};

    let index = 1;
    if (rate16Bits) {
      result.heartRate = value.getUint16(
        index,
        /*littleEndian=*/ true
      );
      index += 2;
    } else {
      result.heartRate = value.getUint8(index);
      index += 1;
    }
    let contactDetected = flags & 0x2;
    let contactSensorPresent = flags & 0x4;
    if (contactSensorPresent) {
      result.contactDetected = !!contactDetected;
    }
    let energyPresent = flags & 0x8;
    if (energyPresent) {
      result.energyExpended = value.getUint16(
        index,
        /*littleEndian=*/ true
      );
      index += 2;
    }
    let rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
      let rrIntervals = [];
      for (; index + 1 < value.byteLength; index += 2) {
        rrIntervals.push(
          value.getUint16(index, /*littleEndian=*/ true)
        );
      }
      result.rrIntervals = rrIntervals;
    }
    return result;
  }

  render() {
    return html`<div
      class=${classMap({
        container: true,
      })}
    >
      <ah-supports .show=${!this.supportsBluetooth}
        ><p>
          Your browser does not support the Web Bluetooth
          API. Please try latest Chrome or Edge or Opera.
          <a href="https://caniuse.com/?search=bluetooth"
            >Details here</a
          >
        </p></ah-supports
      >

      ${this.supportsBluetooth
        ? html`
            <ah-button @click=${this.askForBlueToothDevices}
              >Connect to Bluetooth HR Strap</ah-button
            >
            <output
              style=${styleMap({
                "--heart-rate": `${
                  (this.heartRate / this.maxHeartRate) * 100
                }`,
              })}
              >${this.heartRate}</output
            >
          `
        : null}
    </div>`;
  }

  static styles = css`
    output {
      border: 1px solid;
      display: block;
      margin-block-start: 1em;
      padding: 1em;

      background: hsl(var(--heart-rate, 70) 100% 50%);
    }
  `;
}
