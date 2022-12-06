import { LitElement, css, html } from "lit";
import {
  customElement,
  property,
  state,
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-wheel-of-names": AHWheelOfNames;
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * An ah-wheel-of-names element.
 */
@customElement("ah-wheel-of-names")
export class AHWheelOfNames extends LitElement {
  @state()
  wheelStarted = false;

  private namesArray = [
    "Marion",
    "Andrew",
    "Arthur",
    "Emma",
  ];

  @state()
  names: string[] = this.namesArray;

  @state()
  startingAngle: number = -270;

  @state()
  content: string = "";

  @state()
  winner: string = "";

  @property({ type: Boolean })
  showTextArea = false;

  @property({ type: Boolean })
  removeWinner = false;

  connectedCallback() {
    super.connectedCallback();

    this.getInputNames();
  }

  getInputNames() {
    const inputNames: string[] = this.textContent
      ? this.textContent
          ?.split("\n")
          .map((l) => l.replace(/\s/g, ""))
          .filter((l) => l !== "")
      : [];

    if (inputNames?.length > 0) {
      this.names = inputNames;
    }
  }

  randomiseArray(arr: any[]) {
    const shuffled = [...arr].sort(
      () => 0.5 - Math.random()
    );

    return shuffled.slice(0, arr.length);
  }

  spinWheel() {
    this.wheelStarted = true;

    // after a set number of seconds. Stop the wheel
    setTimeout(() => {
      this.wheelStarted = false;
      // this.names = this.randomiseArray(this.names);
      this.startingAngle = randomInteger(0, 1280);
      const remainder = this.startingAngle % 360;

      this.winner =
        this.names[
          Math.floor((remainder / 360) * this.names.length)
        ];

      this.showDialog();
    }, 1000);
  }

  handleTextChange(e: any) {
    this.content = e.target.value;
  }

  addNames() {
    this.names = this.content.split("\n");
  }

  showDialog() {
    const dialog = this.renderRoot.querySelector("dialog");
    dialog?.showModal();

    if (dialog) {
      dialog.addEventListener("close", () => {
        if (dialog.returnValue === "close") {
          dialog?.close();
        } else if (dialog.returnValue === "remove") {
          this.removeTheWinner();
          dialog?.close();
        }
      });
    }
  }

  removeTheWinner() {
    const newNames = [...this.names];

    newNames.splice(
      newNames.findIndex((name) => name === this.winner),
      1
    );

    this.names = newNames;
    this.winner = "";
  }

  handleWheelReset() {
    this.getInputNames();
  }

  render() {
    return html`
      ${this.showTextArea
        ? html`
            <textarea
              @change=${this.handleTextChange}
              .value=${this.content}
            ></textarea>

            <button @click=${this.addNames}>
              ADD NAMES
            </button>
          `
        : null}
      ${this.names.length > 0
        ? html`
            <div>
              <button @click=${this.spinWheel}>Spin</button>
            </div>
          `
        : html`
            <button @click=${this.handleWheelReset}>
              Reset Wheel ?
            </button>
          `}

      <dialog>
        <form method="dialog">
          <button class="close" value="close">Close</button>
          ${this.winner !== ""
            ? html`
                <div class="winner">
                  <p>
                    Winner: <strong>${this.winner}</strong>
                  </p>
                </div>
                <button value="remove">
                  Remove Winner?
                </button>
              `
            : html`<p>
                No winner has been chosen. Close the dialog
                and spin the wheel.
              </p>`}
        </form>
      </dialog>

      <div class="spinner-wrapper" @click=${this.spinWheel}>
        <div class="overflow">
          <div
            style=${styleMap({
              "--starting-angle": `${this.startingAngle}`,
              "--per-segment": `${360 / this.names.length}`,
              "--sections": `${this.names.length}`,
            })}
            class=${classMap({
              wheel: true,
              wheelActive: this.wheelStarted,
            })}
          >
            ${this.names.map((name, index) => {
              return html`<div
                class="name"
                style="--multiplier: ${index}"
              >
                <span>${name}</span>
              </div>`;
            })}
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .winner {
      margin-block: 1em;
    }
    .close {
      display: flex;
      margin-left: auto;
    }
    dialog::backdrop {
      background: rgba(0, 0, 0, 0.75);
    }

    dialog {
      width: 100%;
      max-width: 500px;
    }

    .spinner-wrapper {
      position: relative;
      display: inline-block;
      padding-right: 3em;
    }

    .spinner-wrapper::after {
      content: "";
      display: block;
      position: absolute;
      top: calc(50% - 20px);
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 20px 40px 20px 0;
      border-color: transparent #007bff transparent
        transparent;
    }
    .overflow {
      overflow: hidden;
    }

    .wheel {
      --size: 400;
      --transX: 200;

      width: calc(var(--size) * 1px);
      aspect-ratio: 1;
      border-radius: 50%;
      position: relative;

      --per-segment: 90;
      --sections: 4;

      background: conic-gradient(
        from 90deg,
        red 0,
        red calc(100 / var(--sections) * 1%),
        orange 0,
        orange calc(100 / var(--sections) * 2%),
        yellow 0,
        yellow calc(100 / var(--sections) * 3%),
        green 0,
        green calc(100 / var(--sections) * 4%),
        blue 0,
        blue calc(100 / var(--sections) * 5%),
        indigo 0,
        indigo calc(100 / var(--sections) * 5%),
        violet 0,
        violet calc(100 / var(--sections) * 6%),
        red 0,
        red calc(100 / var(--sections) * 7%),
        orange 0,
        orange calc(100 / var(--sections) * 8%),
        yellow 0,
        yellow calc(100 / var(--sections) * 9%)
      );

      rotate: calc(var(--starting-angle, 180) * -1deg);
      transition: rotate 300ms ease 1s;
    }

    .name {
      text-shadow: 0 0 10px white;
      position: absolute;
      left: 50%;
      top: 50%;

      --angle: calc(
        calc(
          var(--per-segment) * var(--multiplier, 1) +
            calc(var(--per-segment) / 2)
        )
      );
      transform-origin: 0 0px;
      transform: rotate(calc(var(--angle) * 1deg));
    }

    .name span {
      display: inline-block;
      transform: translateX(calc(var(--transX, 70) * 1%))
        translateY(-10px);
    }

    .wheelActive {
      animation: rotate 3ms infinite linear;
    }

    textarea {
      width: 100%;
      height: 500px;
    }

    @media (max-width: 500px) {
      .wheel {
        --size: 200;
        --transX: 70;
      }
    }

    @keyframes rotate {
      to {
        rotate: calc(var(--starting-angle, 180) * 1deg);
      }
    }
  `;
}
