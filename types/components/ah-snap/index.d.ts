import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-snap": AHSnap;
    }
}
/**
 * An ah-snap element.
 */
export declare class AHSnap extends LitElement {
    count: number;
    difficultyLevel: string;
    gameAnimals: any[];
    gameState: any[];
    showAnimals: boolean;
    guesses: any[];
    correctGuesses: number;
    private numberOfAnimals;
    private animals;
    getMultipleRandom(arr: any[], num: number): any[];
    randomiseArray(arr: any[]): any[];
    start(): void;
    connectedCallback(): void;
    createBoard(): void;
    handleCell(index: number): void;
    nextPlayer(): void;
    resetActiveGameState(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
