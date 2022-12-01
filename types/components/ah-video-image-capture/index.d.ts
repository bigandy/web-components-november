import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-video-image-capture": AHVideoImageCapture;
    }
}
/**
 * An ah-video-capture element. Extends the ah-video-capture and does things with the image
 * @slot - This element has a slot
 */
export declare class AHVideoImageCapture extends LitElement {
    private video;
    private context;
    showVideo: boolean;
    active: boolean;
    imageSrc: string;
    showGame: boolean;
    showImage: boolean;
    handleSnap(): void;
    activateVideo(): void;
    handleShowVideo(): void;
    handleSwitch(e: any): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
