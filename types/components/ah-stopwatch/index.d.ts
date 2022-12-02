import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-stopwatch": AHStopwatch;
    }
}
/**
 * An ah-stopwatch element.
 */
export declare class AHStopwatch extends LitElement {
    time: number;
    playing: boolean;
    private interval;
    static styles: import("lit").CSSResult;
    handlePause(): void;
    createInterval(): void;
    handleStart(): void;
    handleStop(): void;
    handleReset(): void;
    render(): import("lit-html").TemplateResult<1>;
}
