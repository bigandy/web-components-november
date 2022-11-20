import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-component-section": AHComponentSection;
    }
}
/**
 * An ah-details-link element.
 * @slot - This element has a slot
 */
export declare class AHComponentSection extends LitElement {
    id: string;
    title: string;
    date: string;
    summary: string;
    prev?: string;
    next?: string;
    open: boolean;
    static styles: import("lit").CSSResult;
    constructor();
    connectedCallback(): void;
    handleNextClick(): void;
    handlePrevClick(): void;
    handleDateClick(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
