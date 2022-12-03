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
    number: number;
    static styles: import("lit").CSSResult;
    private numbers;
    render(): import("lit-html").TemplateResult<1>;
}
