import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-bluetooth-hr": AHBluetoothHR;
    }
}
/**
 * An ah-bluetooth-hr element.
 */
export declare class AHBluetoothHR extends LitElement {
    device: any;
    heartRate: any;
    supportsBluetooth: boolean;
    show: boolean;
    maxHeartRate: number;
    onDisconnected(): void;
    handleDisconnect: () => void;
    connectedCallback(): void;
    askForBlueToothDevices(): void;
    /**
     * https://github.com/WebBluetoothCG/demos/blob/gh-pages/heart-rate-sensor/heartRateSensor.js
     */
    parseHeartRate(value: DataView): any;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
