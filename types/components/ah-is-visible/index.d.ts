import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-is-visible": AHIsVisible;
    }
}
declare const AHIsVisible_base: typeof LitElement;
/**
 * An ah-is-visible element.
 * A wrapper element that detects whether the content within is in the viewport
 */
export declare class AHIsVisible extends AHIsVisible_base {
    constructor();
    elementVisible: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
