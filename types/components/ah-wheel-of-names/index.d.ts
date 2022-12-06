import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-wheel-of-names": AHWheelOfNames;
    }
}
/**
 * An ah-wheel-of-names element.
 */
export declare class AHWheelOfNames extends LitElement {
    wheelStarted: boolean;
    private namesArray;
    names: string[];
    startingAngle: number;
    content: string;
    winner: string;
    showTextArea: boolean;
    removeWinner: boolean;
    private dialog;
    connectedCallback(): void;
    getInputNames(): void;
    randomiseArray(arr: any[]): any[];
    spinWheel(): void;
    handleTextChange(e: any): void;
    addNames(): void;
    firstUpdated(): void;
    showDialog(): void;
    removeTheWinner(): void;
    handleWheelReset(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
