import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-noise-button": AHNoiseButton;
  }
}

/**
 * An ah-noise-button element.
 * @slot - This element has a slot
 */
@customElement("ah-noise-button")
export class AHNoiseButton extends LitElement {
  @property()
  audioCtx: AudioContext | null = null;

  @property({ type: Boolean })
  noise = false;

  @property({ type: Boolean })
  kick = false;

  checkPolicy() {
    if (this.audioCtx?.state === "suspended") {
      this.audioCtx.resume();
    } else {
      this.audioCtx = new AudioContext();
    }
  }

  private _playNoise(time: number = 1) {
    this.checkPolicy();
    if (this.audioCtx) {
      var volume = this.audioCtx.createGain();
      volume.connect(this.audioCtx.destination);
      volume.gain.value = 0.01;

      //create, tune, start and connect each oscillator sinea, sineb and sinec
      var sinea = this.audioCtx.createOscillator();
      sinea.frequency.value = 440;
      sinea.type = "sine";
      sinea.start(0.2);
      sinea.connect(volume).connect(this.audioCtx.destination);
      sinea.stop(time);

      var sineb = this.audioCtx.createOscillator();
      sineb.frequency.value = 523.25;
      sineb.type = "square";
      sineb.start(0.5);
      sineb.connect(volume).connect(this.audioCtx.destination);
      sineb.stop(time + 0.3);

      var sinec = this.audioCtx.createOscillator();
      sinec.frequency.value = 698.46;
      sinec.type = "sine";
      sinec.start(0.9);
      sinec.connect(volume).connect(this.audioCtx.destination);
      sinec.stop(time + 0.6);
    }
  }

  private playKick(time: number) {
    this.checkPolicy();
    if (this.audioCtx) {
      const osc = new OscillatorNode(this.audioCtx, {
        frequency: 130,
        type: "sine",
      });

      osc.frequency.linearRampToValueAtTime(0.01, time + 0.4);

      const gainNode = new GainNode(this.audioCtx);
      gainNode.gain.setValueAtTime(0.1, time);
      gainNode.gain.linearRampToValueAtTime(0, time + 0.4);

      osc.start(time);
      osc.connect(gainNode).connect(this.audioCtx.destination);
      osc.stop(time + 0.4);
    }
  }

  handleClick() {
    if (this.noise) {
      this._playNoise(2);
    }
    if (this.kick) {
      this.playKick(0.02);
    }
  }

  render() {
    return html`
      <ah-button outlined @click=${this.handleClick}>
        <slot></slot>
      </ah-button>
    `;
  }
}
