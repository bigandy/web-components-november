import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-noise-button": AHNoiseButton;
    }
}
/**
 * An ah-noise-button element.
 * @slot - This element has a slot
 */
export declare class AHNoiseButton extends LitElement {
    audioCtx: AudioContext | null;
    noise: boolean;
    kick: boolean;
    checkPolicy(): void;
    private _playNoise;
    private playKick;
    handleClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}
