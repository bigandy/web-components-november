import dayjs from "dayjs";
import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-time-diff": AHTimeDiff;
    }
}
/**
 * An ah-button element. A simple button that has a toggleable active state that changes when you click the button.
 * @slot - This element has a slot
 */
export declare class AHTimeDiff extends LitElement {
    date: dayjs.Dayjs;
    targetDateString: string;
    render(): import("lit-html").TemplateResult<1>;
}
