import dayjs from "dayjs";

import { html, css, LitElement } from "lit";

// import "./style.css";

/**
 * A calendar Element.
 */
export class AHCalendar extends LitElement {
  static get styles() {
    return css`
      :host {
        --orange: var(--brand, #ff3c00);
      }

      .wrapper {
        container-name: calendar;
        container-type: inline-size;
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

      .month-buttons button {
        display: inline-block;
        padding: 0.51em;
        margin: 1rem;
        background: var(--orange);
        color: white;
      }

      .month-buttons button:hover {
        cursor: pointer;
        background: darkorange;
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

      .day,
      .vh {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
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
          grid-template-columns: 5fr 6fr;
        }

        tr:nth-child(1) .calendar__day:nth-child(1) {
          border-top: 1px solid black;
        }

        .calendar__day--active .daycount {
          background: inherit;
          color: inherit;
        }

        .day {
          all: unset;
          padding: 1em;
          color: var(--brand);
        }
      }
    `;
  }

  indexToDay(index) {
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
    }
  }

  constructor() {
    super();
    this.offset = 0;
  }

  static get properties() {
    return {
      /**
       * The month offset. i.e. 0 is the current month, -1 is the last month, and 1 is the next month.
       * @type {number}
       */
      offset: { type: Number, reflect: true },
    };
  }

  getMonth(offset = 0) {
    const today = dayjs().add(offset, "month");
    const month = today.format("MMMM");
    const year = today.format("YYYY");
    const daysInMonth = today.daysInMonth();
    const firstDayofMonth = this.dayToNumericDay(
      today.startOf("month").format("dd")
    );

    const todayDay =
      offset === 0 ? parseInt(today.format("DD")) : 0;

    return {
      month,
      year,
      daysInMonth,
      firstDayofMonth,
      todayDay,
    };
  }

  dayToNumericDay(firstDayofMonth) {
    let firstDayNumeric = 0;

    const daysOfWeek = [
      "Mo",
      "Tu",
      "We",
      "Th",
      "Fr",
      "Sa",
      "Su",
    ];

    daysOfWeek.forEach((dayofWeek, index) => {
      if (dayofWeek === firstDayofMonth) {
        firstDayNumeric = index + 1;
      }
    });

    return firstDayNumeric;
  }

  header() {
    const { month, year } = this.getMonth(this.offset);

    // wrap a span around each letter
    const monthSpread = [...month].map(
      (letter) => html`<span>${letter}</span>`
    );

    return html`<header>
	<div>
		<h1 class="calendar__month">${monthSpread}</h1>
		<h2 class="calendar__year">${year}${this.yearButtons()}</h2>

		${this.monthButtons()}
	</header>
	`;
  }

  table() {
    const {
      month,
      year,
      daysInMonth,
      firstDayofMonth,
      todayDay,
    } = this.getMonth(this.offset);
    const currentClass =
      this.offset === 0 ? "calendar--current" : "";

    // Rows
    let dayCount = 0;
    // calculate number of rows.
    let rows = Math.ceil(
      (daysInMonth + firstDayofMonth) / 7
    );
    let returnHtml = "";

    const rowsReturn = [];

    for (let j = 0; j < rows; j++) {
      const row = [];
      // returnHtml += `<tr>`;
      for (let i = 1; i < 8; i++) {
        if (
          (j === 0 && i < firstDayofMonth) ||
          dayCount > daysInMonth - 1
        ) {
          row.push(html`<td></td>`);
        } else {
          dayCount++;

          row.push(
            html`<td
              class=${dayCount === todayDay
                ? "calendar__day calendar__day--active"
                : "calendar__day"}
            >
              <span class="day">${this.indexToDay(i)}</span>
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
      ${this.header()}

      <table class="calendar_days">
        <thead>
          <tr>
            <th>
              m<span class="medium">on</span
              ><span class="long">day</span>
            </th>
            <th>
              tu<span class="medium">e</span
              ><span class="long">sday</span>
            </th>
            <th>
              w<span class="medium">ed</span
              ><span class="long">nesday</span>
            </th>
            <th>
              th<span class="medium">u</span
              ><span class="long">rsday</span>
            </th>
            <th>
              f<span class="medium">ri</span
              ><span class="long">day</span>
            </th>
            <th>
              sa<span class="medium">t</span
              ><span class="long">urday</span>
            </th>
            <th>
              su<span class="medium">n</span
              ><span class="long">day</span>
            </th>
          </tr>
        </thead>
        <tbody>
          ${rowsReturn}
        </tbody>
      </table>
    </div>`;
  }

  monthButtons() {
    return html`<div class="month-buttons">
      <button @click=${this._onSubtract}>Previous</button
      ><button @click=${this._onAdd}>Next</button>
    </div>`;
  }

  yearButtons() {
    const { month: lastYearMonth, year: lastYearYear } =
      this.getMonth(this.offset - 12);
    const { month: nextYearMonth, year: nextYearYear } =
      this.getMonth(this.offset + 12);

    return html`<div class="year-buttons">
      <button @click=${(_) => this._onSubtract(_, 12)}>
        &larr;<span class="vh"
          >${lastYearMonth} ${lastYearYear}</span
        >
      </button>
      <button @click=${(_) => this._onAdd(_, 12)}>
        <span class="vh"
          >${nextYearMonth} ${nextYearYear}</span
        >&rarr;
      </button>

      <button
        @click=${this._resetCalendar}
        @disabled=${this.offset === 0}
      >
        Today
      </button>
    </div>`;
  }

  outputTable(offset) {
    const {
      month,
      year,
      daysInMonth,
      firstDayofMonth,
      todayDay,
    } = this.getMonth(offset);
    const currentClass =
      offset === 0 ? "calendar--current" : "";

    return html` ${this.table()} `;
  }

  render() {
    return html`
      <div class="wrapper">
        ${this.outputTable(this.offset)}
      </div>
    `;
  }

  _onAdd(_, number = 1) {
    this.offset = this.offset + number;
  }
  _onSubtract(_, number = 1) {
    this.offset = this.offset - number;
  }
  _resetCalendar() {
    this.offset = 0;
  }
}

customElements.define("ah-calendar", AHCalendar);
