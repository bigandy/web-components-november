import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

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

  @state()
  showVideo = false;

  handleSnap() {
    if (this.context && this.video) {
      this.context.drawImage(this.video as CanvasImageSource, 0, 0, 640, 480);
    }
  }

  private stream: any;

  activateVideo() {
    // Code copied and then modified from https://davidwalsh.name/browser-camera demo. Thanks David Walsh!

    // Grab elements, create settings, etc.
    var canvas = this.renderRoot.querySelector("canvas");

    if (canvas) {
      this.context = canvas.getContext("2d");
      this.video = this.renderRoot.querySelector("video");
      var mediaConfig = { video: true };

      // Put video listeners into place
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(mediaConfig).then((stream) => {
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

  render() {
    return html` <ah-button
        class=${classMap({
          hide: !this.showVideo,
          show: this.showVideo,
        })}
        @click=${this.cancel}
        >Stop Feed</ah-button
      >
      <div
        class=${classMap({
          hide: !this.showVideo,
          show: this.showVideo,
        })}
      >
        <video id="video" width="640" height="480" autoplay></video>
        <button @click=${this.handleSnap}>Snap Photo</button>
        <canvas id="canvas" width="640" height="480"></canvas>
      </div>

      <ah-button
        @click=${this.handleShowVideo}
        class=${classMap({
          hide: this.showVideo,
          show: !this.showVideo,
        })}
      >
        Use Video
      </ah-button>`;
  }

  static styles = css`
    canvas {
      border: 1px solid;
    }

    .hide {
      display: none;
    }

    .show {
      display: block;
    }
  `;
}
