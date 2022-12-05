import dayjs from "dayjs";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { VH } from "../../constants/styles";

declare global {
  interface HTMLElementTagNameMap {
    "ah-calendar": AHCalendar;
  }
}

/**
 * An calendar element.
 */
@customElement("ah-calendar")
export class AHCalendar extends LitElement {
  @property()
  offset: number = 0;

  static styles = [
    VH,
    css`
      :host {
        --orange: var(--brand, #ff3c00);
        --ah-button-background: var(--orange);
        --ah-button-background-hover: red;
      }

      .wrapper {
        container-name: calendar;
        container-type: inline-size;
        resize: horizontal;
        overflow: auto;
        outline: solid 1px grey;
        outline-offset: 4px;
      }

      .day {
        display: none;
      }

      table {
        width: 100%;
        border-spacing: 0;
        border-collapse: separate;
      }

      th,
      td {
        padding-left: 0;
        text-align: left;
      }

      th {
        padding-inline: 1rem;
      }

      .calendar {
        font-family: "Roboto", sans-serif;
        font-weight: bold;
      }

      .calendar--current .calendar__month,
      .calendar--current .calendar__year {
        color: var(--orange);
      }

      .calendar__month {
        letter-spacing: -5px;
        font-size: 500%;
        margin-bottom: 0;
      }

      .calendar__month span:nth-child(3) ~ span {
        display: none;
      }

      .calendar__year {
        letter-spacing: -2px;
        margin-top: 0;
        padding-bottom: 0.5em;
        border-bottom: 1px solid grey;
      }
      .calendar__day--active {
        color: var(--orange);
      }

      .calendar__day--active .daycount {
        background: var(--orange);
        color: white;
        border-radius: 50%;
      }

      td span {
        padding: 1em;
        display: inline-block;
      }

      .month-buttons {
        display: flex;
        display: none;
      }

      .month-buttons ah-button {
        display: inline-block;
        margin: 1rem;
        color: white;
      }

      .medium,
      .long {
        display: none;
      }

      header {
        position: relative;
      }

      .month-buttons {
        position: absolute;
        bottom: 0;
        right: 0;
      }

      .year-buttons {
        display: none;
        margin-inline-start: 1rem;
      }

      .year-buttons button {
        border: 0;
        margin-inline: 0.5rem;
        position: relative;
        bottom: 2px;
      }

      .year-buttons button:hover {
        background: darkgray;
        cursor: pointer;
      }

      @container (inline-size > 400px) {
        .medium {
          display: inline-block;
        }

        .month-buttons {
          display: block;
        }

        th {
          padding-block-end: 1rem;
        }

        th,
        td {
          text-align: center;
          vertical-align: center;
        }

        td:not(:empty) {
          background: rgba(0, 0, 0, 0.05);
        }

        .calendar__month span:nth-child(3) ~ span {
          display: inline;
        }
      }

      @container (inline-size > 1000px) {
        .year-buttons,
        .long {
          display: inline-block;
        }
      }

      @container (inline-size > 1600px) {
        .calendar__day:hover {
          color: white;
          background-image: linear-gradient(
            45deg,
            #000000 16.67%,
            #ffffff 16.67%,
            #ffffff 50%,
            #000000 50%,
            #000000 66.67%,
            #ffffff 66.67%,
            #ffffff 100%
          );
          background-size: 10px 10px;
          text-shadow: 0 0 3px #000000;
        }
      }

      @container (inline-size < 300px) {
        // the narrow view
        table {
          // this has to be here which is weird!. Bug.
        }

        td:not(:empty) {
          display: block;
          border-bottom: 1px solid black;
          width: 100%;
        }

        th {
          display: none;
        }

        table {
          height: 300px;
          overflow-x: hidden;
          overflow-y: auto;
          width: 100%;
        }

        .calendar__year {
          padding-bottom: 0;
          border-bottom: none;
        }

        tr,
        table,
        thead,
        tbody {
          display: block;
          width: 100%;
        }

        td.calendar__day {
          display: grid;
          grid-template-columns: 5fr 5fr;
        }

        tr:nth-child(1) .calendar__day:nth-child(1) {
          border-top: 1px solid black;
        }

        .calendar__day--active .daycount {
          background: inherit;
          color: inherit;
        }

        .daycount {
          text-align: right;
        }

        .day {
          all: unset;
          padding: 1em;
        }
      }
    `,
  ];

  private _indexToDay(index: number) {
    switch (index) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 7:
        return "Sunday";
      default:
        return "no day";
    }
  }

  private _getMonth(offset = 0) {
    const today = dayjs().add(offset, "month");
    const month = today.format("MMMM");
    const year = today.format("YYYY");
    const daysInMonth = today.daysInMonth();
    const firstDayofMonth = this._dayToNumericDay(
      today.startOf("month").format("dd")
    );

    const todayDay = offset === 0 ? parseInt(today.format("DD")) : 0;

    return {
      month,
      year,
      daysInMonth,
      firstDayofMonth,
      todayDay,
    };
  }

  private _dayToNumericDay(firstDayofMonth: string) {
    let firstDayNumeric = 0;

    const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    daysOfWeek.forEach((dayofWeek, index) => {
      if (dayofWeek === firstDayofMonth) {
        firstDayNumeric = index + 1;
      }
    });

    return firstDayNumeric;
  }

  private _renderHeader() {
    const { month, year } = this._getMonth(this.offset);

    // wrap a span around each letter
    const monthSpread = [...month].map(
      (letter) => html`<span>${letter}</span>`
    );

    return html`<header>
      <h1 class="calendar__month">${monthSpread}</h1>
      <h2 class="calendar__year">${year}${this._renderYearButtons()}</h2>

      ${this._renderMonthButtons()}
    </header> `;
  }

  private _renderTable() {
    const { daysInMonth, firstDayofMonth, todayDay } = this._getMonth(
      this.offset
    );
    const currentClass = this.offset === 0 ? "calendar--current" : "";

    // Rows
    let dayCount = 0;
    // calculate number of rows.
    let rows = Math.ceil((daysInMonth + firstDayofMonth) / 7);

    const rowsReturn = [];

    for (let j = 0; j < rows; j++) {
      const row = [];
      // returnHtml += `<tr>`;
      for (let i = 1; i < 8; i++) {
        if ((j === 0 && i < firstDayofMonth) || dayCount > daysInMonth - 1) {
          row.push(html`<td></td>`);
        } else {
          dayCount++;

          row.push(
            html`<td
              class=${dayCount === todayDay
                ? "calendar__day calendar__day--active"
                : "calendar__day"}
            >
              <span class="day vh">${this._indexToDay(i)}</span>
              <span class="daycount">${dayCount}</span>
            </td>`
          );
        }
      }

      rowsReturn.push(
        html`<tr>
          ${row}
        </tr>`
      );
    }

    return html`<div class="calendar ${currentClass}">
      ${this._renderHeader()}

      <table class="calendar_days">
        <thead>
          <tr>
            <th>
              m<span class="medium">on</span><span class="long">day</span>
            </th>
            <th>
              tu<span class="medium">e</span><span class="long">sday</span>
            </th>
            <th>
              w<span class="medium">ed</span><span class="long">nesday</span>
            </th>
            <th>
              th<span class="medium">u</span><span class="long">rsday</span>
            </th>
            <th>
              f<span class="medium">ri</span><span class="long">day</span>
            </th>
            <th>
              sa<span class="medium">t</span><span class="long">urday</span>
            </th>
            <th>
              su<span class="medium">n</span><span class="long">day</span>
            </th>
          </tr>
        </thead>
        <tbody>
          ${rowsReturn}
        </tbody>
      </table>
    </div>`;
  }

  private _renderMonthButtons() {
    return html`<div class="month-buttons">
      <ah-button @click=${() => this._onSubtract()}>Previous</ah-button
      ><ah-button @click=${() => this._onAdd()}>Next</ah-button>
    </div>`;
  }

  private _renderYearButtons() {
    const { month: lastYearMonth, year: lastYearYear } = this._getMonth(
      this.offset - 12
    );
    const { month: nextYearMonth, year: nextYearYear } = this._getMonth(
      this.offset + 12
    );

    return html`<div class="year-buttons">
      <button @click=${() => this._onSubtract(12)}>
        &larr;<span class="vh">${lastYearMonth} ${lastYearYear}</span>
      </button>
      <button @click=${() => this._onAdd(12)}>
        <span class="vh">${nextYearMonth} ${nextYearYear}</span>&rarr;
      </button>

      <button @click=${this._resetCalendar} ?disabled=${this.offset === 0}>
        Today
      </button>
    </div>`;
  }

  private _onAdd(number = 1) {
    this.offset = this.offset + number;
  }
  private _onSubtract(number = 1) {
    this.offset = this.offset - number;
  }
  private _resetCalendar() {
    this.offset = 0;
  }

  render() {
    return html` <div class="wrapper">${this._renderTable()}</div> `;
  }
}
