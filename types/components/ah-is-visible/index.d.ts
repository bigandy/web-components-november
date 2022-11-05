declare global {
    interface HTMLElementTagNameMap {
        "ah-is-visible": AHIsVisible;
    }
}
declare const AHIsVisible_base: {
    new (): {
        [x: string]: any;
        connectedCallback(): void;
        disconnectedCallback(): void;
        handleIntersectionCallback(entries: any): void;
    };
    [x: string]: any;
};
/**
 * An ah-is-visible element.
 * A wrapper element that detects whether the content within is in the viewport
 */
export declare class AHIsVisible extends AHIsVisible_base {
    static styles: import("lit").CSSResult;
    constructor();
    elementVisible: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
