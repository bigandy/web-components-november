import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-habit-tracker": AHHabitTracker;
    }
}
/**
 * A ah-habit-tracker element.
 */
export declare class AHHabitTracker extends LitElement {
    columns: number;
    rows: number;
    trackerState: Boolean[];
    connectedCallback(): void;
    handleCellClick(i: number): void;
    save(state: Boolean[]): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
