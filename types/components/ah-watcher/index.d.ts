import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-watcher": AHWatcher;
    }
}
/**
 * An ah-is-visible element.
 * A wrapper element that detects whether the content within is in the viewport
 */
export declare class AHWatcher extends LitElement {
    matched: boolean;
    handleMatched(e: any): void;
    render(): import("lit-html").TemplateResult<1>;
}
