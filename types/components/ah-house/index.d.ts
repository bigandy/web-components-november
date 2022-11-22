import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-house": AHHouse;
        "ah-light": AHLight;
        "ah-room": AHRoom;
    }
}
/**
 * An ah-house element.
 * @slot - This element has a slot
 */
export declare class AHHouse extends LitElement {
    lights: {
        main: boolean;
        kitchen: boolean;
        bedroom: boolean;
        lounge: boolean;
    };
    static styles: import("lit").CSSResult;
    handleSwitch(e: any): void;
    render(): import("lit-html").TemplateResult<1>;
}
/**
 * An ah-light element.
 */
export declare class AHLight extends LitElement {
    on: boolean;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
/**
 * An ah-room element.
 */
export declare class AHRoom extends LitElement {
    on: boolean;
    room: string;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
