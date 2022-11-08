import { LitElement, html, css } from "lit";
import {
  customElement,
  property,
  state,
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import dayjs, { Dayjs } from "dayjs";

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

    console.log(storageArray);
  }

  onChange(e: any) {
    console.log(e.target.value);
    this.inputValue = e.target.value;
  }

  handleSubmit() {
    console.log("submit please");
    console.log(this.inputValue);

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

    this.inputValue = "";
  }

  save(state: TodoType[]) {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify(state)
    );
  }

  static styles = css`
    .done {
      color: green;
    }

    .done::before {
      background: lightgrey;
    }

    .todo {
      position: relative;
    }

    .todo::before {
      content: "";
      display: inline-block;
      height: 0.7em;
      width: 0.7em;
      border-radius: 50%;
      border: 1px solid;
    }

    li {
      padding: 0;
      margin-bottom: 1em;
      --ah-button-background: red;
      --ah-button-color: white;
      --ah-button-padding-inline: 0;
      --ah-button-padding-block: 0;
      --ah-button-background-hover: darkred;
    }

    ul {
      list-style: none;
      margin-block: 1em;
      padding: 0;
    }
  `;

  handleTodoDone(index: number) {
    console.log(index, this.todos[index]);

    const newState = [...this.todos];

    newState[index].done = !newState[index].done;

    this.todos = newState;

    this.save(this.todos);
  }

  handleDelete(e: any, index: number) {
    e.stopPropagation();
    console.log(index, this.todos[index]);

    const newState = [...this.todos];

    // newState[index].done = !newState[index].done;

    this.todos = newState;

    this.save(this.todos);

    // const newState = [...this.todos];

    // newState[index].done = !newState[index].done;

    // this.todos = newState;
  }

  render() {
    return html`
      <div>
        <input
          type="text"
          .value="${this.inputValue}"
          @change=${this.onChange}
        />

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
                    @click=${(e) =>
                      this.handleDelete(e, index)}
                    >Delete?</ah-button
                  >
                </li>`;
              })
            : null}
        </ul>

        <ah-button type="submit" @click=${this.handleSubmit}
          >Submit</ah-button
        >
      </div>
    `;
  }
}
