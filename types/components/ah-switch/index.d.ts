import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-switch": AHSwitch;
    }
}
/**
 * An ah-house element.
 */
export declare class AHSwitch extends LitElement {
    on: boolean;
    ref: string;
    fullWidth: boolean;
    hideLabel: boolean;
    muted: boolean;
    private initialized;
    private audioCtx;
    static styles: import("lit").CSSResult;
    handleSound(): void;
    private _initializeAudio;
    play(url: string): Promise<void>;
    handleToggle(): void;
    render(): import("lit-html").TemplateResult<1>;
}
