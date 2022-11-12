import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-button": AHButton;
    }
}
/**
 * An ah-button element. A simple button that has a toggleable active state that changes when you click the button.
 * @slot - This element has a slot
 * @csspart after - The after part of the button
 * @csspart before - The before part of the button
 */
export declare class AHButton extends LitElement {
    outlined: boolean;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
