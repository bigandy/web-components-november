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
    gameState: null[][];
    finished: boolean;
    winner: string;
    private winningArrays;
    handleColumn(column: number): void;
    checkWinner(): void;
    resetBoard(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
