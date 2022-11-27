import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-theme-selector": AHThemeSelector;
    }
}
type themeType = "none" | "dark" | "rainbow" | "red";
/**
 * An ah-theme-selector element.
 */
export declare class AHThemeSelector extends LitElement {
    open: Boolean;
    theme: themeType;
    connectedCallback(): void;
    firstUpdated(): void;
    handleToggle(): void;
    handleInputClick: (e: any) => void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};
