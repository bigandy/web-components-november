import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-image-game": AHImageGame;
    }
}
/**
 * An ah-image-game element.
 * @slot - This element has a slot
 */
export declare class AHImageGame extends LitElement {
    private columns;
    private rows;
    private totalCells;
    private image;
    shuffleArray(array: number[]): number[];
    boardState: never[];
    activeCell: number;
    handleCell(cell: number): void;
    checkIfCanActivate(cell: number): boolean | undefined;
    generateBoard(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
