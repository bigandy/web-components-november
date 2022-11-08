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
    private _elementVisible;
    IOVisibleLimit: number;
    get elementVisible(): boolean;
    set elementVisible(val: boolean);
    render(): import("lit-html").TemplateResult<1>;
}
export {};
