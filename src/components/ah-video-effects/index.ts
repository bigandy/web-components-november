import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-video-effects": AHVideoEffects;
  }
}

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;

/**
 * An ah-video-effects element.
 * @slot - This element has a slot
 */
@customElement("ah-video-effects")
export class AHVideoEffects extends LitElement {
  private video: HTMLVideoElement | null = null;
  private context: CanvasRenderingContext2D | null = null;

  @state()
  showVideo = false;

  @state()
  effect: "none" | "greyscale" | "red" | "green" | "blue" =
    "none";

  handleSnap() {
    if (this.context && this.video) {
      this.context.drawImage(
        this.video as CanvasImageSource,
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );
    }
  }

  private stream: any;

  connectedCallback() {
    super.connectedCallback();

    setInterval(() => {
      this.handleSnap();
      if (this.effect === "greyscale") {
        this.applyGrayScale();
      }
      if (this.effect === "red") {
        this.applyRed();
      }
      if (this.effect === "green") {
        this.applyGreen();
      }
      if (this.effect === "blue") {
        this.applyBlue();
      }
    }, 100); // once every 100 ms
  }

  activateVideo() {
    // Code copied and then modified from https://davidwalsh.name/browser-camera demo. Thanks David Walsh!

    // Grab elements, create settings, etc.
    var canvas = this.renderRoot.querySelector("canvas");

    if (canvas) {
      this.context = canvas.getContext("2d");
      this.video = this.renderRoot.querySelector("video");
      var mediaConfig = { video: true };

      // Put video listeners into place
      if (
        navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia
      ) {
        navigator.mediaDevices
          .getUserMedia(mediaConfig)
          .then((stream) => {
            if (this.video) {
              this.video.srcObject = stream;
              this.video.play();
            }
            this.stream = stream;
          });
      }
    }
  }

  handleShowVideo() {
    this.showVideo = true;

    if (this.showVideo) {
      this.activateVideo();
    }
  }

  cancel() {
    this.stream.getTracks().forEach((track: any) => {
      track.stop();
      this.showVideo = false;
    });
  }

  getPixelValue(
    data: Uint8ClampedArray,
    x: number,
    y: number
  ) {
    return {
      red: data[(y * CANVAS_HEIGHT + x) * 4 + 0],
      green: data[(y * CANVAS_HEIGHT + x) * 4 + 1],
      blue: data[(y * CANVAS_HEIGHT + x) * 4 + 2],
      alpha: data[(y * CANVAS_HEIGHT + x) * 4 + 3],
    };
  }

  applyGrayScale() {
    if (this.context) {
      var imgData = this.context.getImageData(
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );
      var data = imgData.data;
      for (var y = 0; y < CANVAS_WIDTH; y++) {
        for (var x = 0; x < CANVAS_HEIGHT; x++) {
          var pixel = this.getPixelValue(data, x, y);

          var avg =
            (pixel.red + pixel.green + pixel.blue) / 3;

          data[(y * CANVAS_HEIGHT + x) * 4 + 0] = avg;
          data[(y * CANVAS_HEIGHT + x) * 4 + 1] = avg;
          data[(y * CANVAS_HEIGHT + x) * 4 + 2] = avg;
        }
      }
      this.context.putImageData(imgData, 0, 0);
    }
  }

  applyRed() {
    if (this.context) {
      var imgData = this.context.getImageData(
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );
      var data = imgData.data;
      for (var y = 0; y < CANVAS_WIDTH; y++) {
        for (var x = 0; x < CANVAS_HEIGHT; x++) {
          var pixel = this.getPixelValue(data, x, y);

          data[(y * CANVAS_HEIGHT + x) * 4 + 0] = pixel.red;
          data[(y * CANVAS_HEIGHT + x) * 4 + 1] = 0;
          data[(y * CANVAS_HEIGHT + x) * 4 + 2] = 0;
        }
      }
      this.context.putImageData(imgData, 0, 0);
    }
  }

  applyGreen() {
    if (this.context) {
      var imgData = this.context.getImageData(
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );
      var data = imgData.data;
      for (var y = 0; y < CANVAS_WIDTH; y++) {
        for (var x = 0; x < CANVAS_HEIGHT; x++) {
          var pixel = this.getPixelValue(data, x, y);

          data[(y * CANVAS_HEIGHT + x) * 4 + 0] = 0;
          data[(y * CANVAS_HEIGHT + x) * 4 + 1] =
            pixel.green;
          data[(y * CANVAS_HEIGHT + x) * 4 + 2] = 0;
        }
      }
      this.context.putImageData(imgData, 0, 0);
    }
  }

  applyBlue() {
    if (this.context) {
      var imgData = this.context.getImageData(
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );
      var data = imgData.data;
      for (var y = 0; y < CANVAS_WIDTH; y++) {
        for (var x = 0; x < CANVAS_HEIGHT; x++) {
          var pixel = this.getPixelValue(data, x, y);

          data[(y * CANVAS_HEIGHT + x) * 4 + 0] = 0;
          data[(y * CANVAS_HEIGHT + x) * 4 + 1] = 0;
          data[(y * CANVAS_HEIGHT + x) * 4 + 2] =
            pixel.blue;
        }
      }
      this.context.putImageData(imgData, 0, 0);
    }
  }

  render() {
    return html`
      <ah-button
        class=${classMap({
          hide: !this.showVideo,
          show: this.showVideo,
        })}
        @click=${this.cancel}
        >Stop Feed</ah-button
      >
      <ah-button
        @click=${this.handleShowVideo}
        class=${classMap({
          hide: this.showVideo,
          show: !this.showVideo,
        })}
      >
        Use Video
      </ah-button>
      <div
        class=${classMap({
          hide: !this.showVideo,
          show: this.showVideo,
        })}
      >
        <video
          id="video"
          width="640"
          height="480"
          autoplay
        ></video>

        <canvas
          id="canvas"
          width="640"
          height="480"
        ></canvas>

        ${this.video
          ? html`<ul class="effects">
              <li>
                <label for="none">No Effect</label>
                <input
                  type="radio"
                  name="effects"
                  id="none"
                  @click=${() => (this.effect = "none")}
                />
              </li>
              <li>
                <label for="greyscale">Greyscale</label>
                <input
                  type="radio"
                  name="effects"
                  id="greyscale"
                  @click=${() =>
                    (this.effect = "greyscale")}
                />
              </li>
              <li>
                <label for="red">Red</label>
                <input
                  type="radio"
                  name="effects"
                  id="red"
                  @click=${() => (this.effect = "red")}
                />
              </li>
              <li>
                <label for="green">Green</label>
                <input
                  type="radio"
                  name="effects"
                  id="green"
                  @click=${() => (this.effect = "green")}
                />
              </li>
              <li>
                <label for="blue">Blue</label>
                <input
                  type="radio"
                  name="effects"
                  id="blue"
                  @click=${() => (this.effect = "blue")}
                />
              </li>
            </ul> `
          : null}
      </div>
    `;
  }

  static styles = css`
    .effects {
      list-style: none;
      padding-left: 0;
    }
    .effects li {
      display: inline-flex;
    }
    canvas {
      width: 100%;
      border: 1px solid;
      height: 100%;
    }

    .hide {
      display: none;
    }

    .imagesWrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .show {
      display: block;
    }

    video {
      display: none;
    }
  `;
}
