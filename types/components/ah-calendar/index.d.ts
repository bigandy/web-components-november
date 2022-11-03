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
    offset: number;
    static styles: import("lit").CSSResult;
    private _indexToDay;
    private _getMonth;
    private _dayToNumericDay;
    private _renderHeader;
    private _renderTable;
    private _renderMonthButtons;
    private _renderYearButtons;
    private _onAdd;
    private _onSubtract;
    private _resetCalendar;
    render(): import("lit-html").TemplateResult<1>;
}
