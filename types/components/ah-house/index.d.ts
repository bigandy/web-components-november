import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-house": AHHouse;
        "ah-light": AHLight;
        "ah-switch": AHSwitch;
    }
}
/**
 * An ah-house element.
 * @slot - This element has a slot
 */
export declare class AHHouse extends LitElement {
    lightOn: boolean;
    handleSwitch(e: any): void;
    render(): import("lit-html").TemplateResult<1>;
}
/**
 * An ah-house element.
 */
export declare class AHSwitch extends LitElement {
    on: boolean;
    handleToggle(): void;
    render(): import("lit-html").TemplateResult<1>;
}
/**
 * An ah-light element.
 */
export declare class AHLight extends LitElement {
    on: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
