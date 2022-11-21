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
  @property({ type: Boolean })
  noise = false;

  @property({ type: Boolean })
  mute = false;

  @property({ type: Boolean })
  lazer = false;

  private initialized = false;

  private sinea: OscillatorNode | null = null;
  private sineb: OscillatorNode | null = null;
  private sinec: OscillatorNode | null = null;
  private osc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;

  private volume: GainNode | null = null;
  private audioCtx: AudioContext | null = null;

  private _initializeAudio() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.audioCtx = new AudioContext();

    this.volume = this.audioCtx.createGain();
    this.volume.connect(this.audioCtx.destination);
    this.volume.gain.value = 0.01; // can adjust this later if you want to have a louder/quieter volume
  }

  private createOscillator(
    frequency: number = 440,
    type: OscillatorType = "sine"
  ) {
    const oscillator = this.audioCtx
      ? this.audioCtx.createOscillator()
      : null;

    if (oscillator && this.audioCtx && this.volume) {
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      oscillator
        .connect(this.volume)
        .connect(this.audioCtx.destination);
    }

    return oscillator;
  }

  private _playNoise() {
    this._initializeAudio();
    if (this.audioCtx && !this.mute) {
      var volume = this.audioCtx.createGain();
      volume.connect(this.audioCtx.destination);
      volume.gain.value = 0.01;

      this.sinea = this.createOscillator();
      this.sinea?.start(this.audioCtx.currentTime);
      this.sinea?.stop(this.audioCtx.currentTime + 1);

      this.sineb = this.createOscillator(523.25, "square");
      this.sineb?.start(this.audioCtx.currentTime + 0.3);
      this.sineb?.stop(this.audioCtx.currentTime + 0.3 + 1);

      this.sinec = this.createOscillator(698.46);
      this.sinec?.start(this.audioCtx.currentTime + 0.9);
      this.sinec?.stop(this.audioCtx.currentTime + 0.9 + 1);
    }
  }

  createOscNode(freq = 130) {
    if (this.audioCtx) {
      const osc = new OscillatorNode(this.audioCtx, {
        frequency: freq,
        type: "sine",
      });
      this.gainNode = new GainNode(this.audioCtx);
      this.gainNode.gain.setValueAtTime(
        0.1,
        this.audioCtx.currentTime
      );
      this.gainNode.gain.linearRampToValueAtTime(
        0,
        this.audioCtx.currentTime + 0.4
      );
      osc
        .connect(this.gainNode)
        .connect(this.audioCtx.destination);
      return osc;
    }
    return null;
  }

  private _playLazer() {
    this._initializeAudio();
    if (this.audioCtx && !this.mute) {
      this.osc = this.createOscNode(555);

      this.osc?.frequency.linearRampToValueAtTime(
        0.01,
        this.audioCtx.currentTime + 0.4
      );

      this.osc?.start(this.audioCtx.currentTime);
      this.osc?.stop(this.audioCtx.currentTime + 0.4);
    }
  }

  handleClick() {
    if (this.noise) {
      this._playNoise();
    }
    if (this.lazer) {
      this._playLazer();
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
