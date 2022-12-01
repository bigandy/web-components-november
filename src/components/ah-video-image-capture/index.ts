import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

declare global {
  interface HTMLElementTagNameMap {
    "ah-video-image-capture": AHVideoImageCapture;
  }
}

/**
 * An ah-video-capture element. Extends the ah-video-capture and does things with the image
 * @slot - This element has a slot
 */
@customElement("ah-video-image-capture")
export class AHVideoImageCapture extends LitElement {
  private video: HTMLVideoElement | null = null;
  private context: CanvasRenderingContext2D | null = null;

  @state()
  showVideo = false;

  @state()
  active = false;

  @state()
  imageSrc = "";

  @state()
  showGame = false;

  @state()
  showImage = false;

  handleSnap() {
    if (this.context && this.video) {
      this.context.drawImage(this.video as CanvasImageSource, 0, 0, 640, 480);
      var canvas = this.renderRoot.querySelector("canvas");

      if (canvas) {
        this.imageSrc = canvas.toDataURL("image/png");
      }
    }
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
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(mediaConfig).then((stream) => {
          if (this.video) {
            this.video.srcObject = stream;
            this.video.play();
          }
        });
      }
    }
  }

  handleShowVideo() {
    this.showVideo = true;

    if (!this.active && this.showVideo) {
      this.active = true;

      this.activateVideo();
    }
  }

  handleSwitch(e: any) {
    console.log(e.detail);
    if (e.detail.ref === "game") {
      this.showGame = e.detail.state;
    }
    if (e.detail.ref === "image") {
      this.showImage = e.detail.state;
    }
  }

  render() {
    return html` <div>
        <ah-button
          @click=${this.handleShowVideo}
          class=${classMap({
            hide: this.showVideo,
            show: !this.showVideo,
          })}
        >
          Use Video
        </ah-button>
      </div>
      <div
        class=${classMap({
          hide: !this.showVideo,
          show: this.showVideo,
        })}
        @switch=${this.handleSwitch}
      >
        <video id="video" width="640" height="480" autoplay></video>

        <canvas id="canvas" width="640" height="480"></canvas>
        <div style="margin-block: 1em;">
          <ah-button @click=${this.handleSnap}>Snap Photo</ah-button>

          ${this.imageSrc !== ""
            ? html`Show Game?:
                <ah-switch hideLabel ref="game" muted></ah-switch>`
            : null}
          ${this.imageSrc !== ""
            ? html`Show Image?:
                <ah-switch ref="image" hideLabel muted></ah-switch>`
            : null}
        </div>
        ${this.imageSrc
          ? html` ${this.showGame
              ? html`<ah-image-game imageSrc=${this.imageSrc}></ah-image-game>`
              : null}`
          : null}
        ${this.imageSrc
          ? html` ${this.showImage
              ? html`<img src=${this.imageSrc} height="300" width="300" />`
              : null}`
          : null}
      </div>`;
  }

  static styles = css`
    ah-image-game {
      display: block;
    }
    canvas {
      border: 1px solid;
      display: none;
    }

    video {
      border: 1px solid;
    }

    .hide {
      display: none;
    }

    .show {
      display: inline-block;
    }
  `;
}
