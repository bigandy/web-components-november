import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-houdini-banner": AHHoudiniBanner;
    }
}
/**
 * An ah-houdini-button element.
 * @slot - This element has a slot
 */
export declare class AHHoudiniBanner extends LitElement {
    browserSupported: boolean;
    checkers: boolean;
    circles: boolean;
    hideWarning: boolean;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
