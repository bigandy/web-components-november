import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-digit": AHDigit;
    }
}
/**
 * An ah-digit element.
 */
export declare class AHDigit extends LitElement {
    numberstring: string;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
