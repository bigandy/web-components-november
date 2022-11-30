import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-snap": AHSnap;
  }
}

/**
 * An ah-snap element.
 */
@customElement("ah-snap")
export class AHSnap extends LitElement {
  @state()
  count = 0;

  @state()
  difficultyLevel = "easy";

  @state()
  gameAnimals: any[] = [];

  private animals: any = {
    sheep: {
      url: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2573&q=80",
    },
    cat: {
      url: "https://images.unsplash.com/photo-1609266086311-0dcf0dcc00dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    },
    dog: {
      url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
    },
    horse: {
      url: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1948&q=80",
    },
    pig: {
      url: "https://images.unsplash.com/photo-1567201080580-bfcc97dae346?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80",
    },
  };

  getMultipleRandom(arr: any[], num: number) {
    const shuffled = [...arr].sort(
      () => 0.5 - Math.random()
    );

    return shuffled.slice(0, num);
  }

  start() {
    // randomise the board.
    const animals = Object.keys(this.animals);

    const randomAnimals = this.getMultipleRandom(
      animals,
      2
    );

    console.log(randomAnimals);

    this.gameAnimals = [
      this.animals[randomAnimals[0]],
      this.animals[randomAnimals[1]],
    ];

    // take two animals and put them in an array randomly.

    // reset the count to zero
    this.count = 0;
  }

  render() {
    return html`<ah-button @click=${this.start}>
        ${this.count > 0 ? "Reset" : "Start"}</ah-button
      >

      ${this.count > 0
        ? html`Number of goes:
            <output>${this.count}</output>`
        : null}
      ${this.gameAnimals.length > 0
        ? html`
            <img
              src=${this.gameAnimals[0].url}
              width="300"
              height="300"
            />
            <img
              src=${this.gameAnimals[1].url}
              width="300"
              height="300"
            />
          `
        : null}

      <div class="board"></div> `;
  }

  static styles = css``;
}
