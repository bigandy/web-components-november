import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-video-effects": AHVideoEffects;
    }
}
/**
 * An ah-video-effects element.
 * @slot - This element has a slot
 */
export declare class AHVideoEffects extends LitElement {
    private video;
    private context;
    showVideo: boolean;
    effect: "none" | "greyscale" | "red" | "green" | "blue";
    handleSnap(): void;
    private stream;
    connectedCallback(): void;
    activateVideo(): void;
    handleShowVideo(): void;
    cancel(): void;
    getPixelValue(data: Uint8ClampedArray, x: number, y: number): {
        red: number;
        green: number;
        blue: number;
        alpha: number;
    };
    applyGrayScale(): void;
    applyColor(input: "red" | "green" | "blue"): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
