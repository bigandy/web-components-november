import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-image-game": AHImageGame;
  }
}

/**
 * An ah-image-game element.
 */
@customElement("ah-image-game")
export class AHImageGame extends LitElement {
  @property({ type: Number })
  columns = 3;

  @property({ type: Number })
  rows = 3;

  @property({ type: String })
  imageSrc =
    "https://github.com/davecowart/placecage/blob/master/images/source/fillmurray/Bill%252BMurray.jpeg?raw=true";

  @property({ type: Boolean })
  randomize = false;

  @property({ type: Boolean })
  showReferenceImage = false;

  @state()
  boardState: number[] = [];

  @state()
  initialBoardState: number[] = [];

  @state()
  winner = false;

  @state()
  activeCell = this.columns - 1;

  private totalCells = 0;

  connectedCallback() {
    super.connectedCallback();

    this.totalCells = this.columns * this.rows;
    this.activeCell = this.columns - 1;
    this.initialBoardState = [...new Array(this.totalCells).keys()];
    this.boardState = this.randomize
      ? this.shuffleArray(this.initialBoardState)
      : this.initialBoardState;
  }

  shuffleArray(array: any[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  checkIfWon() {
    const arrayOne = this.boardState;
    const arrayTwo = this.initialBoardState;

    // this is a way to compare two arrays that I found on the internet! https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
    if (
      arrayOne.length === arrayTwo.length &&
      arrayOne.every((value, index) => value === arrayTwo[index])
    ) {
      this.winner = true;
    } else {
      this.winner = false;
    }
  }

  handleCell(cell: number) {
    // const cell = col + row * 3;
    const canActivate = this.checkIfCanActivate(cell);

    if (canActivate) {
      // What is the value of the activeCell index?
      const valueAtActiveCell = this.boardState[this.activeCell];

      // clone the array;
      const updatedArray = [...this.boardState];

      // Swap the items
      updatedArray[this.activeCell] = this.boardState[cell];
      updatedArray[cell] = valueAtActiveCell;

      // update the boardState with the new array
      this.boardState = updatedArray;

      this.activeCell = cell;
    }

    this.checkIfWon();
  }

  checkIfCanActivate(cell: number) {
    if (cell === this.activeCell) {
      return;
    }

    const finalRow = this.totalCells - this.columns;
    const firstRow = this.columns;

    if (
      this.activeCell <= firstRow &&
      cell === this.activeCell + this.columns
    ) {
      // console.log("first row");
      return true;
    } else if (
      this.activeCell >= finalRow &&
      cell === this.activeCell - this.columns
    ) {
      // console.log("final row");
      return true;
    } else if (
      (this.activeCell >= firstRow &&
        this.activeCell <= finalRow &&
        cell === this.activeCell - this.columns) ||
      cell === this.activeCell + this.columns
    ) {
      // console.log("middle row");
      return true;
    }

    const cellRemainder = cell % this.columns;

    if (cellRemainder >= 1 && cell === this.activeCell + 1) {
      return true;
    } else if (
      cellRemainder >= 0 &&
      cellRemainder !== this.columns - 1 &&
      cell === this.activeCell - 1
    ) {
      return true;
    }

    return false;
  }

  generateBoard() {
    this.boardState = this.shuffleArray([...this.initialBoardState]);
    this.winner = false;
  }

  render() {
    return html`
      <ah-button @click=${this.generateBoard}>Scramble Board</ah-button>
      <div class="wrapper">
        <div
          class=${classMap({
            board: true,
            winner: this.winner,
          })}
          style=${styleMap({
            "--ah-image-game-image-src": `url(${this.imageSrc})`,
            "--ah-image-game-columns": `${this.columns}`,
            "--ah-image-game-rows": `${this.rows}`,
          })}
        >
          ${[...new Array(this.totalCells)].map((_, index) => {
            const initialColumn = index % this.columns;
            const initialRow = Math.floor(index / this.columns);

            const col = this.boardState[index] % this.columns;
            const row = Math.floor(this.boardState[index] / this.columns);

            return html` <div
              @click=${() => this.handleCell(index)}
              class=${classMap({
                cell: true,
                activeCell: index === this.activeCell,
              })}
              style=${styleMap({
                "--col": `${initialColumn}`,
                "--row": `${initialRow}`,
                "--initial-col": `${col}`,
                "--initial-row": `${row}`,
              })}
            ></div>`;
          })}
        </div>
        ${this.showReferenceImage ? html`<img src=${this.imageSrc} />` : null}
      </div>
    `;
  }

  static styles = css`
    .board {
      gap: 0.1em;
      border: 1px solid;
      height: var(--height);
      aspect-ratio: 1;
      display: grid;
      grid-template-columns: repeat(var(--columns), 1fr);
      grid-template-rows: repeat(var(--rows), 1fr);

      --height: var(--ah-image-game-size, 500px);
      --columns: var(--ah-image-game-columns, 3);
      --rows: var(--ah-image-game-rows, 3);
    }

    .winner {
      border: 20px solid green;
      cursor: not-allowed;

      pointer-events: none;
    }

    .cell {
      background-image: var(--ah-image-game-image-src);
      background-size: var(--height) var(--height);
      background-repeat: no-repeat;
      grid-row-start: calc(var(--row) + 1);
      grid-column-start: calc(var(--col) + 1);
      background-position: calc(
          var(--initial-col) * calc(var(--height) / var(--columns) * -1)
        )
        calc(var(--initial-row) * calc(var(--height) / var(--rows) * -1));
    }

    .activeCell {
      position: relative;
      overflow: hidden;
      background: black;
    }

    .activeCell::after {
      background-color: grey;
      box-sizing: border-box;

      border: 10px solid grey;
      box-shadow: inset 0 0 0 10px rgba(255, 255, 255, 0.2),
        inset 0 0 0 20px rgba(255, 255, 255, 0.3),
        inset 0 0 0 30px rgba(255, 255, 255, 0.4),
        inset 0 0 0 40px rgba(255, 255, 255, 0.5),
        0 0 0 40px rgba(255, 255, 255, 0.4), 0 0 0 30px rgba(255, 255, 255, 0.4),
        0 0 0 20px rgba(255, 255, 255, 0.4), 0 0 0 10px rgba(255, 255, 255, 0.4);
      transform: rotate(4deg);
      transition: box-shadow 600ms ease, transform 600ms ease;
      height: 100%;
      width: 100%;
      content: "";
      display: block;
      border-radius: 50%;
      border-top-left-radius: 59%;
    }

    .activeCell:hover::after {
      transform: rotate(-6deg);
    }

    .wrapper {
      margin-block: 1em;
    }

    .wrapper:has(img) {
      display: grid;
      grid-template-columns: 1fr 300px;
    }

    img {
      height: 300px;
      width: 300px;
    }
  `;
}
