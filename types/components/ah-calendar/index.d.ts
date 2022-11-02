import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-calendar": AHCalendar;
    }
}
/**
 * An calendar element.
 */
export declare class AHCalendar extends LitElement {
    static styles: import("lit").CSSResult;
    indexToDay(index: number): "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday" | "no day";
    offset: number;
    getMonth(offset?: number): {
        month: string;
        year: string;
        daysInMonth: number;
        firstDayofMonth: number;
        todayDay: number;
    };
    dayToNumericDay(firstDayofMonth: string): number;
    private _renderHeader;
    private _renderTable;
    monthButtons(): import("lit-html").TemplateResult<1>;
    yearButtons(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
    _onAdd(number?: number): void;
    _onSubtract(number?: number): void;
    _resetCalendar(): void;
}
