import { LitElement } from "lit";
import { Dayjs } from "dayjs";
declare global {
    interface HTMLElementTagNameMap {
        "ah-todo-list": AHTodoList;
    }
}
type TodoType = {
    createdAt: Dayjs;
    done: boolean;
    text: string;
};
/**
 * An ah-heading element. A simple heading where you can control the rendered tag
 * @slot - This element has a slot
 */
export declare class AHTodoList extends LitElement {
    todos: TodoType[];
    inputValue: string;
    connectedCallback(): void;
    private _keydownHandler;
    onChange(e: any): void;
    handleSubmit(): void;
    clearInput(): void;
    save(state: TodoType[]): void;
    static styles: import("lit").CSSResult;
    handleTodoDone(index: number): void;
    handleDelete(e: any, index: number): void;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
