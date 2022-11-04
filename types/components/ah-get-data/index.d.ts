import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-get-data": AHGetData;
    }
}
/**
 * An ah-button element. A simple button that has a toggleable active state that changes when you click the button.
 * @slot - This element has a slot
 */
export declare class AHGetData extends LitElement {
    dataSource: undefined;
    key: undefined;
    values: string;
    result: never[];
    connectedCallback(): Promise<void>;
    renderTable(): import("lit-html").TemplateResult<1>;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
