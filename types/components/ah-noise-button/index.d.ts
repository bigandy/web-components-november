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
    noise: boolean;
    mute: boolean;
    lazer: boolean;
    private initialized;
    private sinea;
    private sineb;
    private sinec;
    private osc;
    private gainNode;
    private volume;
    private audioCtx;
    private _initializeAudio;
    private createOscillator;
    private _playNoise;
    createOscNode(freq?: number): OscillatorNode | null;
    private _playLazer;
    handleClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}
