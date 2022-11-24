import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-video-capture": AHVideoCapture;
    }
}
/**
 * An ah-video-capture element.
 * @slot - This element has a slot
 */
export declare class AHVideoCapture extends LitElement {
    private video;
    private context;
    firstUpdated(): void;
    handleSnap(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
