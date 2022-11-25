import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-image-game": AHImageGame;
  }
}

/**
 * An ah-image-game element.
 * @slot - This element has a slot
 */
@customElement("ah-image-game")
export class AHImageGame extends LitElement {
  private columns = 3;
  private rows = 3;
  private totalCells = this.columns * this.rows;

  // private image = "";

  shuffleArray(array: number[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(
        Math.random() * currentIndex
      );
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  @state()
  boardState = [];

  @state()
  activeCell = 0;

  handleCell(cell: number) {
    const canActivate = this.checkIfCanActivate(cell);

    if (canActivate) {
      console.log("cell", cell);
      this.activeCell = cell;
    }
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
      console.log("first row");
      return true;
    } else if (
      this.activeCell >= finalRow &&
      cell === this.activeCell - this.columns
    ) {
      console.log("final row");
      return true;
    } else if (
      (this.activeCell >= firstRow &&
        this.activeCell <= finalRow &&
        cell === this.activeCell - this.columns) ||
      cell === this.activeCell + this.columns
    ) {
      console.log("middle row");
      return true;
    }

    const cellRemainder = cell % this.columns;

    if (
      cellRemainder >= 1 &&
      cell === this.activeCell + 1
    ) {
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
    // @ts-ignore
    this.boardState = this.shuffleArray([
      0, 1, 2, 3, 4, 5, 6, 7, 8,
    ]);
  }

  connectedCallback(): void {
    super.connectedCallback();
    // @ts-ignore
    this.boardState = this.shuffleArray([
      0, 1, 2, 3, 4, 5, 6, 7, 8,
    ]);
  }

  render() {
    return html` <ah-button @click=${this.generateBoard}
        >Generate Board</ah-button
      >
      <div class="board">
        ${[...new Array(this.totalCells)].map(
          (_, index) => {
            const initialColumn = index % this.columns;
            const initialRow = Math.floor(
              index / this.columns
            );

            // console.log(this.boardState[index]);

            const col =
              this.boardState[index] % this.columns;
            const row = Math.floor(
              this.boardState[index] / this.columns
            );

            // console.log(col, row);

            return html` <div
              @click=${() => this.handleCell(index)}
              class=${classMap({
                cell: true,
                activeCell: index === this.activeCell,
              })}
              style=${styleMap({
                // @ts-ignore
                "--col": col,
                // @ts-ignore
                "--row": row,
                // @ts-ignore
                "--initial-col": initialColumn,
                // @ts-ignore
                "--initial-row": initialRow,
              })}
            ></div>`;
          }
        )}
      </div>`;
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

      --height: 500px;
      --columns: 3;
      --rows: 3;
    }

    .cell {
      background-size: var(--height) var(--height);
      background-image: url("https://www.fillmurray.com/500/500");
      background-repeat: no-repeat;
      grid-row-start: calc(var(--row) + 1);
      grid-column-start: calc(var(--col) + 1);
      background-position: calc(
          var(--initial-col) *
            calc(var(--height) / var(--columns) * -1)
        )
        calc(
          var(--initial-row) *
            calc(var(--height) / var(--rows) * -1)
        );
    }

    .activeCell {
      background: green;
    }
  `;
}
