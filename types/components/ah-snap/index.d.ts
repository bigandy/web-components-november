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
    private animals;
    getMultipleRandom(arr: any[], num: number): any[];
    start(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
