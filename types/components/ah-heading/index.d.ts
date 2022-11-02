import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-header": AHHeading;
    }
}
/**
 * An ah-heading element. A simple heading where you can control the rendered tag
 * @slot - This element has a slot
 */
export declare class AHHeading extends LitElement {
    variant: string;
    render(): import("lit-html").TemplateResult<1 | 2>;
}
