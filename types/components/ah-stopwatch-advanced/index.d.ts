import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-stopwatch-advanced": AHStopwatchAdvanced;
    }
}
/**
 * An ah-stopwatch-advanced element.
 */
export declare class AHStopwatchAdvanced extends LitElement {
    time: number;
    playing: boolean;
    private interval;
    static styles: import("lit").CSSResult;
    handlePause(): void;
    createInterval(): void;
    handleStart(): void;
    handleStop(): void;
    handleReset(): void;
    convertTimetoSeconds(time: number): number[];
    convertTimetoMinutes(time: number): number[];
    convertTimetoHours(time: number): number[];
    display(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
