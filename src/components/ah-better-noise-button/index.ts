import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-better-noise-button": AHBetterNoiseButton;
  }
}

/**
 * An ah-better-noise-button element.
 */
@customElement("ah-better-noise-button")
export class AHBetterNoiseButton extends LitElement {
  @property({ type: Boolean })
  cycling = false;

  private initialized = false;

  private sinea: OscillatorNode | null = null;
  private sineb: OscillatorNode | null = null;
  private sinec: OscillatorNode | null = null;

  private volume: GainNode | null = null;
  private interval: number | undefined = undefined;
  private audioCtx: AudioContext | null = null;

  initializeAudio() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.audioCtx = new AudioContext();

    this.volume = this.audioCtx.createGain();
    this.volume.connect(this.audioCtx.destination);
    this.volume.gain.value = 0.01; // can adjust this later if you want to have a louder/quieter volume
  }

  createOscillator(
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

  playTune() {
    if (this.audioCtx) {
      this.sinea = this.createOscillator(440);
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

  handleStart() {
    this.initializeAudio();

    this.playTune();
    if (this.cycling) {
      this.interval = setInterval(
        () => this.playTune(),
        2000
      );
    }

    if (this.volume) {
      this.volume.gain.value = 0.11;
    }
  }

  handleStop() {
    if (this.sinea) {
      this.sinea.stop();
    }
    if (this.sineb) {
      this.sineb.stop();
    }
    if (this.sinec) {
      this.sinec.stop();
    }
    clearInterval(this.interval);
  }

  render() {
    return html`
      <ah-button outlined @click=${this.handleStart}>
        Start
      </ah-button>

      <ah-button @click=${this.handleStop}>
        Stop
      </ah-button>
    `;
  }
}
