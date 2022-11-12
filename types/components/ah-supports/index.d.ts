import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-supports": AHSupports;
    }
}
/**
 * An ah-supports element.
 * @slot - This element has a slot
 */
export declare class AHSupports extends LitElement {
    show: boolean;
    render(): import("lit-html").TemplateResult<1> | null;
    static styles: import("lit").CSSResult;
}
