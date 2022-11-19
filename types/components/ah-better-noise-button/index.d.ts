import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-better-noise-button": AHBetterNoiseButton;
    }
}
/**
 * An ah-better-noise-button element.
 */
export declare class AHBetterNoiseButton extends LitElement {
    private initialized;
    private sinea;
    private sineb;
    private sinec;
    private volume;
    private interval;
    private audioCtx;
    initializeAudio(): void;
    createOscillator(frequency?: number, type?: OscillatorType): OscillatorNode | null;
    playTune(): void;
    handleStart(): void;
    handleStop(): void;
    render(): import("lit-html").TemplateResult<1>;
}
