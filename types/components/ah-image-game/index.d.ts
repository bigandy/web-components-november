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
    imageSrc: string;
    shuffleArray(array: any[]): any[];
    boardState: number[];
    activeCell: number;
    handleCell(cell: number): void;
    checkIfCanActivate(cell: number): boolean | undefined;
    generateBoard(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
