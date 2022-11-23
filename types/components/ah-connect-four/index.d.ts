import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-connect-four": AHConnectFour;
    }
}
/**
 * An ah-connect-four element.
 * @slot - This element has a slot
 */
export declare class AHConnectFour extends LitElement {
    currentPlayer: boolean;
    gameState: any;
    finished: boolean;
    winner: string;
    handleColumn(column: number): void;
    checkForWinner(): any;
    resetBoard(): void;
    deepClone(arr: any): any;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
