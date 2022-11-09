import { LitElement, html, css } from "lit";
import {
  customElement,
  property,
  state,
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import dayjs, { Dayjs } from "dayjs";

import { CROSS_ICON } from "../../constants/icons";

declare global {
  interface HTMLElementTagNameMap {
    "ah-todo-list": AHTodoList;
  }
}

const localStorageKey = "wcn2022-todos";

type TodoType = {
  createdAt: Dayjs;
  done: boolean;
  text: string;
};

/**
 * An ah-heading element. A simple heading where you can control the rendered tag
 * @slot - This element has a slot
 */
@customElement("ah-todo-list")
export class AHTodoList extends LitElement {
  @state()
  todos: TodoType[] = [];

  @property()
  inputValue = "";

  connectedCallback() {
    super.connectedCallback();

    const storage = localStorage.getItem(localStorageKey);

    const storageArray =
      storage && storage !== "" && JSON.parse(storage);

    if (Array.isArray(storageArray)) {
      this.todos = storageArray;
    }
  }

  private _keydownHandler(e: any) {
    if (e.target.value) {
      this.inputValue = e.target.value;
    }

    if (e.code === "Enter") {
      this.handleSubmit();
      this.clearInput();
    }
  }

  onChange(e: any) {
    this.inputValue = e.target.value;
  }

  handleSubmit() {
    const oldState = [...this.todos];

    this.todos = [
      ...oldState,
      {
        text: this.inputValue,
        createdAt: dayjs(),
        done: false,
      },
    ];

    this.save(this.todos);

    this.clearInput();
  }

  clearInput() {
    this.inputValue = "";
  }

  save(state: TodoType[]) {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify(state)
    );
  }

  static styles = css`
    :host > div {
      margin-block: 2em;
    }

    .done {
      text-decoration: line-through;
    }

    .done::before {
      background: black;
    }

    .todo {
      position: relative;
    }

    .todo::before {
      content: "";
      display: inline-block;
      height: 0.7em;
      width: 0.7em;
      border: 2px solid;
      position: relative;
      top: 0.25em;
    }

    input {
      width: 250px;
      padding: 1em;
    }

    li {
      padding: 0;
      margin-bottom: 1em;
      --ah-button-background: red;
      --ah-button-color: white;
      --ah-button-padding-inline: 1em;
      --ah-button-padding-block: 0.5em;
      --ah-button-background-hover: darkred;
      display: grid;

      grid-template-columns: auto 1fr 1fr;
      gap: 1em;
      width: 400px;
    }

    [type="submit"] {
      --ah-button-padding-inline: 1.8em;
      --ah-button-padding-block: 0.9em;

      --ah-button-background: rgb(0 0 0 / 0.5);
      --ah-button-background-hover: black;
    }

    li svg {
      fill: currentColor;
      width: 1.25em;
      height: 1.25em;
      vertical-align: -3px;
    }

    li ah-button {
      font-size: 12px;
      opacity: 0.15;
      transitiion: opacity 300ms ease-in-out;
    }

    li:hover ah-button {
      opacity: 1;
    }

    ul {
      list-style: none;
      margin-block: 1em;
      padding: 0;
    }
  `;

  handleTodoDone(index: number) {
    const newState = [...this.todos];

    newState[index].done = !newState[index].done;

    this.todos = newState;

    this.save(this.todos);
  }

  handleDelete(e: any, index: number) {
    e.stopPropagation();

    const newState = [...this.todos];
    newState.splice(index, 1);
    this.todos = newState;

    this.save(this.todos);
  }

  render() {
    return html`
      <div>
        <label for="todoInput">Create To-do: </label>
        <input
          id="todoInput"
          type="text"
          .value="${this.inputValue}"
          @change=${this.onChange}
          @keydown=${this._keydownHandler}
          placeholder="Create a new web component with lit!"
        />

        <ah-button type="submit" @click=${this.handleSubmit}
          >Submit</ah-button
        >

        <ul>
          ${Boolean(this.todos.length > 0)
            ? this.todos.map((todo, index) => {
                return html`<li
                  class=${classMap({
                    done: todo.done,
                    todo: true,
                  })}
                  @click=${() => this.handleTodoDone(index)}
                >
                  ${todo.text}

                  <ah-button
                    @click=${(e: any) =>
                      this.handleDelete(e, index)}
                  >
                    <div slot="before">${CROSS_ICON}</div>
                    Delete</ah-button
                  >
                </li>`;
              })
            : null}
        </ul>
      </div>
    `;
  }
}
