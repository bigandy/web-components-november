import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-image-match": AHImageMatch;
    }
}
/**
 * An ah-image-match element.
 */
export declare class AHImageMatch extends LitElement {
    difficultyLevel: string;
    gameAnimals: any[];
    gameState: any[];
    showAnimals: boolean;
    guesses: any[];
    correctGuesses: number;
    numberOfAnimals: number;
    private animals;
    getMultipleRandom(arr: any[], num: number): any[];
    randomiseArray(arr: any[]): any[];
    reset(): void;
    connectedCallback(): void;
    createBoard(): void;
    handleCell(index: number): void;
    nextPlayer(): void;
    resetActiveGameState(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
