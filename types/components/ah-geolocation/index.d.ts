import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-geolocation": AHGeolocation;
    }
}
/**
 * An ah-geolocation element.
 */
export declare class AHGeolocation extends LitElement {
    href: string;
    mapLinkText: string;
    coords?: string;
    deviceOrientation?: {
        alpha: number | null;
        beta: number | null;
        gamma: number | null;
    } | null;
    acceleration?: {
        x: any;
        y: any;
        z: any;
    } | null;
    geoFindMe(): void;
    success(position: any): void;
    error(e: any): void;
    connectedCallback(): void;
    handleMotion(): void;
    handleOrientation(event: DeviceOrientationEvent): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
