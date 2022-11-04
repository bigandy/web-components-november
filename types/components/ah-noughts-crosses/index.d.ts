import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-noughts-crosses": AHNoughtsCrosses;
    }
}
/**
 * An ah-noughts-crosses element. A simple button that has a toggleable active state that changes when you click the button.
 */
export declare class AHNoughtsCrosses extends LitElement {
    static styles: import("lit").CSSResult;
    boardState: any;
    firstPlayerActive: boolean;
    winner: boolean;
    handleInputChange(index: number): void;
    renderIcon(index: number): import("lit-html").TemplateResult<1> | null;
    resetBoard(): void;
    calculateIfWinner(): void;
    render(): import("lit-html").TemplateResult<1>;
}
