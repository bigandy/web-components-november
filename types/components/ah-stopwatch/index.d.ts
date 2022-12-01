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
    time: string;
    static styles: import("lit").CSSResult;
    handlePause(): void;
    handleStart(): void;
    handleStop(): void;
    render(): import("lit-html").TemplateResult<1>;
}
