import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-scroller": AHScroller;
    }
}
/**
 * An ah-scroller element.
 * @slot - This element has a slot
 */
export declare class AHScroller extends LitElement {
    scrollX: boolean;
    scrollY: boolean;
    scrollBoth: boolean;
    scrollbars: boolean;
    height: undefined;
    width: undefined;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
