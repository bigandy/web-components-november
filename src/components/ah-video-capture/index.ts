import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-video-capture": AHVideoCapture;
  }
}

/**
 * An ah-video-capture element.
 * @slot - This element has a slot
 */
@customElement("ah-video-capture")
export class AHVideoCapture extends LitElement {
  private video: HTMLVideoElement | null = null;
  private context: CanvasRenderingContext2D | null = null;

  firstUpdated(): void {
    // using first updated because connectedCallback does not yet contain the contents added by the render() function

    // Code copied and then modified from https://davidwalsh.name/browser-camera demo. Thanks David Walsh!

    // Grab elements, create settings, etc.
    var canvas = this.renderRoot.querySelector("canvas");

    console.log(canvas);
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
          });
      }
    }
  }

  handleSnap() {
    if (this.context && this.video) {
      this.context.drawImage(
        this.video as CanvasImageSource,
        0,
        0,
        640,
        480
      );
    }
  }
  render() {
    return html` <video
        id="video"
        width="640"
        height="480"
        autoplay
      ></video>
      <button @click=${this.handleSnap}>Snap Photo</button>
      <canvas
        id="canvas"
        width="640"
        height="480"
      ></canvas>`;
  }

  static styles = css`
    canvas {
      border: 1px solid;
    }
  `;
}
